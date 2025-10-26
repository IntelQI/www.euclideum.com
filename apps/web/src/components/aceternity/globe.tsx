"use client";

import * as React from "react";
import { useRef, useMemo, useEffect, useState } from "react";
import { Vector3 } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface ArcData {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
}

interface GlobeConfig {
  pointSize: number;
  globeColor: string;
  showAtmosphere: boolean;
  atmosphereColor: string;
  atmosphereAltitude: number;
  emissive: string;
  emissiveIntensity: number;
  shininess: number;
  polygonColor: string;
  ambientLight: string;
  directionalLeftLight: string;
  directionalTopLight: string;
  pointLight: string;
  arcTime: number;
  arcLength: number;
  rings: number;
  maxRings: number;
  initialPosition: { lat: number; lng: number };
  autoRotate: boolean;
  autoRotateSpeed: number;
}

interface WorldProps {
  data: ArcData[];
  globeConfig: GlobeConfig;
}

interface GeoJSONFeature {
  type: string;
  properties: Record<string, unknown>;
  geometry: {
    type: string;
    coordinates: number[][][] | number[][][][];
  };
}

interface GeoJSONData {
  type: string;
  features: GeoJSONFeature[];
}

const GLOBE_RADIUS = 100;

function latLngToVector3(lat: number, lng: number, radius: number): Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new Vector3(x, y, z);
}

function GlobeMesh({
  globeConfig,
  geoData,
}: {
  globeConfig: GlobeConfig;
  geoData: GeoJSONData | null;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!geoData) return;

    // Create canvas texture from GeoJSON data
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    });

    if (ctx) {
      // Disable smoothing for crisp dots
      ctx.imageSmoothingEnabled = false;

      // Ocean color (bright turquoise background)
      ctx.fillStyle = globeConfig.globeColor;
      ctx.fillRect(0, 0, 2048, 1024);

      // Land mass dots color - dark navy blue
      ctx.fillStyle = "#002233";
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;

      const dotSize = 2.5;
      const dotSpacing = 3.5;

      // Process GeoJSON features - fill polygons with dots
      geoData.features.forEach((feature) => {
        const processPolygon = (coords: number[][][]) => {
          coords.forEach((ring) => {
            if (ring.length < 3) return;

            let minX = Infinity,
              maxX = -Infinity;
            let minY = Infinity,
              maxY = -Infinity;

            const canvasCoords: number[][] = [];

            ring.forEach((coord) => {
              if (!coord || coord.length < 2) return;
              const lng = coord[0];
              const lat = coord[1];

              if (typeof lng !== "number" || typeof lat !== "number") return;

              const x = ((lng + 180) / 360) * 2048;
              const y = ((90 - lat) / 180) * 1024;

              minX = Math.min(minX, x);
              maxX = Math.max(maxX, x);
              minY = Math.min(minY, y);
              maxY = Math.max(maxY, y);

              canvasCoords.push([x, y]);
            });

            if (canvasCoords.length < 3) return;

            for (
              let x = Math.floor(minX);
              x <= Math.ceil(maxX);
              x += dotSpacing
            ) {
              for (
                let y = Math.floor(minY);
                y <= Math.ceil(maxY);
                y += dotSpacing
              ) {
                let inside = false;
                for (
                  let i = 0, j = canvasCoords.length - 1;
                  i < canvasCoords.length;
                  j = i++
                ) {
                  const coordI = canvasCoords[i];
                  const coordJ = canvasCoords[j];

                  if (
                    !coordI ||
                    !coordJ ||
                    coordI.length < 2 ||
                    coordJ.length < 2
                  )
                    continue;

                  const xi = coordI[0];
                  const yi = coordI[1];
                  const xj = coordJ[0];
                  const yj = coordJ[1];

                  if (
                    xi === undefined ||
                    yi === undefined ||
                    xj === undefined ||
                    yj === undefined
                  )
                    continue;

                  const intersect =
                    yi > y !== yj > y &&
                    x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
                  if (intersect) inside = !inside;
                }

                if (inside) {
                  ctx.beginPath();
                  ctx.arc(x, y, dotSize, 0, Math.PI * 2);
                  ctx.fill();
                }
              }
            }
          });
        };

        if (feature.geometry.type === "Polygon") {
          processPolygon(feature.geometry.coordinates as number[][][]);
        } else if (feature.geometry.type === "MultiPolygon") {
          (feature.geometry.coordinates as number[][][][]).forEach(
            (polygon) => {
              processPolygon(polygon);
            },
          );
        }
      });

      const tex = new THREE.CanvasTexture(canvas);
      setTexture(tex);
    }
  }, [geoData, globeConfig]);

  useFrame(({ clock }) => {
    if (meshRef.current && globeConfig.autoRotate) {
      meshRef.current.rotation.y =
        clock.getElapsedTime() * globeConfig.autoRotateSpeed * 0.1;
    }
  });

  if (!texture) return null;

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        color={globeConfig.globeColor}
        emissive={globeConfig.emissive}
        emissiveIntensity={globeConfig.emissiveIntensity}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

function Arc({ arc, globeConfig }: { arc: ArcData; globeConfig: GlobeConfig }) {
  const groupRef = useRef<THREE.Group>(null);
  const tubeRef = useRef<THREE.Mesh | null>(null);

  const curve = useMemo(() => {
    const startVec = latLngToVector3(arc.startLat, arc.startLng, GLOBE_RADIUS);
    const endVec = latLngToVector3(arc.endLat, arc.endLng, GLOBE_RADIUS);

    const altitude = GLOBE_RADIUS * arc.arcAlt;
    const midpoint = startVec.clone().add(endVec).multiplyScalar(0.5);
    midpoint.normalize().multiplyScalar(GLOBE_RADIUS + altitude);

    const pts = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const t1 = 1 - t;
      const point = new Vector3(
        t1 * t1 * startVec.x + 2 * t1 * t * midpoint.x + t * t * endVec.x,
        t1 * t1 * startVec.y + 2 * t1 * t * midpoint.y + t * t * endVec.y,
        t1 * t1 * startVec.z + 2 * t1 * t * midpoint.z + t * t * endVec.z,
      );
      pts.push(point);
    }

    return new THREE.CatmullRomCurve3(pts);
  }, [arc]);

  // Create tube geometry for the path
  const tube = useMemo(() => {
    const tubeGeometry = new THREE.TubeGeometry(curve, 64, 0.25, 8, false);
    const tubeMaterial = new THREE.MeshBasicMaterial({
      color: "#22c55e",
      transparent: true,
      opacity: 0,
    });
    return new THREE.Mesh(tubeGeometry, tubeMaterial);
  }, [curve]);

  useEffect(() => {
    if (tube) tubeRef.current = tube;
  }, [tube]);

  useFrame(({ clock }) => {
    if (tubeRef.current && groupRef.current) {
      const time = clock.getElapsedTime();
      const speed = globeConfig.arcTime / 1000;

      const startTime = arc.order * 0.3;
      const animTime = (time - startTime) / speed;
      const progress = animTime % 1.5;

      const tubeMaterial = tubeRef.current.material as THREE.MeshBasicMaterial;

      // Rotate with globe
      if (globeConfig.autoRotate) {
        const rotation =
          clock.getElapsedTime() * globeConfig.autoRotateSpeed * 0.1;
        groupRef.current.rotation.y = rotation;
      }

      if (progress < 1) {
        tubeMaterial.opacity = Math.min(progress * 2, 0.85);

        const geometry = tubeRef.current.geometry as THREE.TubeGeometry;
        const totalSegments = 64;
        const visibleSegments = Math.floor(progress * totalSegments);
        geometry.setDrawRange(0, visibleSegments * 50);
      } else {
        const fadeProgress = (progress - 1) / 0.5;
        tubeMaterial.opacity = Math.max(0.85 * (1 - fadeProgress), 0);

        if (fadeProgress > 0.99) {
          const geometry = tubeRef.current.geometry as THREE.TubeGeometry;
          geometry.setDrawRange(0, Infinity);
        }
      }
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={tube} />
    </group>
  );
}

function Scene3D({
  data,
  globeConfig,
  geoData,
}: {
  data: ArcData[];
  globeConfig: GlobeConfig;
  geoData: GeoJSONData | null;
}) {
  return (
    <>
      <ambientLight intensity={0.6} color={globeConfig.ambientLight} />
      <directionalLight
        position={[-20, -50, 30]}
        intensity={1.2}
        color={globeConfig.directionalLeftLight}
      />
      <directionalLight
        position={[20, -50, -30]}
        intensity={0.8}
        color={globeConfig.directionalTopLight}
      />
      <pointLight
        position={[0, -100, 100]}
        intensity={0.8}
        color={globeConfig.pointLight}
      />

      <GlobeMesh globeConfig={globeConfig} geoData={geoData} />

      {data.map((arc, idx) => (
        <Arc key={`arc-${idx}`} arc={arc} globeConfig={globeConfig} />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate={globeConfig.autoRotate}
        autoRotateSpeed={globeConfig.autoRotateSpeed}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        target={[0, 20, 0]}
      />
    </>
  );
}

export function World({ data, globeConfig }: WorldProps) {
  const [geoData, setGeoData] = useState<GeoJSONData | null>(null);

  useEffect(() => {
    fetch("/globe.json")
      .then((res) => res.json())
      .then((data: GeoJSONData) => setGeoData(data))
      .catch((err) => console.error("Error loading globe data:", err));
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{
          position: [0, -120, 200],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Scene3D data={data} globeConfig={globeConfig} geoData={geoData} />
      </Canvas>
    </div>
  );
}
