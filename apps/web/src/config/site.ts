import { absoluteUrl } from "@/lib/utils";

export const siteConfig = {
  name: "Euclideum Solutions",

  description:
    "Global technology and innovation powerhouse shaping the future across industries — delivering cutting-edge software, cloud infrastructure, and enterprise solutions, while nurturing the complete learning lifecycle through advanced educational tools, IQ development platforms, and products designed to empower the next generation of genius minds.",

  url: "https://www.euclideum.com",

  og: {
    image: absoluteUrl("/og.jpg"),

    size: {
      width: 1200,
      height: 630,
    },
  },

  app: {
    latestVersion: "1.0.0",
  },

  company: {
    name: "Euclideum Solutions Private Limited",
    legalName: "Euclideum Solutions Private Limited",
    tagline: "Shaping the Future Through Innovation",
    email: "contact@euclideum.com",
    phone: "+1-XXX-XXX-XXXX", // Update with actual phone
    address: {
      street: "", // Add actual address
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
  },

  links: {
    twitter: {
      label: "Twitter",
      username: "@euclideum",
      url: "https://twitter.com/euclideum",
    },

    linkedin: {
      label: "LinkedIn",
      url: "https://linkedin.com/company/euclideum-solutions",
    },

    github: {
      label: "GitHub",
      url: "https://github.com/euclideum",
    },

    youtube: {
      label: "YouTube",
      url: "https://youtube.com/@euclideum",
    },
  },

  industries: [
    "Software Development",
    "Cloud Infrastructure",
    "Enterprise Solutions",
    "Educational Technology",
    "IQ Development Platforms",
    "Learning Management Systems",
  ],

  keywords: [
    "euclideum",
    "euclideum solutions",
    "technology company",
    "software development",
    "cloud infrastructure",
    "enterprise solutions",
    "educational technology",
    "edtech",
    "IQ development",
    "learning platforms",
    "innovation",
    "AI solutions",
    "digital transformation",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
