"use client";

import {
  ChevronDown,
  ExternalLink,
  Github,
  Linkedin,
  MonitorCog,
  Moon,
  Sun,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ThemeLogo } from "@/components/theme-logo";
import { CTASection } from "@/components/cta-section";
import { siteConfig } from "@/config/site";

type linkType = "DROPDOWN" | "LINK" | "EXTERNAL_LINK";

interface NavigationLink {
  type?: linkType;
  name: string;
  href?: string;
  links?: Omit<NavigationLink, "type">[];
}

interface Navigation {
  title: string;
  links: NavigationLink[];
}

const NAVIGATION: Array<Navigation> = [
  {
    title: "Solutions",
    links: [
      {
        type: "LINK",
        name: "Software Development",
        href: "/solutions/software",
      },
      {
        type: "LINK",
        name: "Cloud Infrastructure",
        href: "/solutions/cloud",
      },
      {
        type: "LINK",
        name: "Enterprise Solutions",
        href: "/solutions/enterprise",
      },
      {
        type: "LINK",
        name: "Educational Technology",
        href: "/solutions/edtech",
      },
      {
        type: "LINK",
        name: "IQ Development",
        href: "/solutions/iq-development",
      },
      {
        type: "LINK",
        name: "Learning Platforms",
        href: "/solutions/learning",
      },
      {
        type: "LINK",
        name: "Digital Transformation",
        href: "/solutions/digital-transformation",
      },
      {
        type: "LINK",
        name: "AI Solutions",
        href: "/solutions/ai",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        type: "LINK",
        name: "Documentation",
        href: "/docs",
      },
      {
        type: "LINK",
        name: "Blog",
        href: "/blog",
      },
      {
        type: "EXTERNAL_LINK",
        name: "Community Forum",
        href: "#",
      },
      {
        type: "LINK",
        name: "API Reference",
        href: "/docs/api",
      },
      {
        type: "LINK",
        name: "Tutorials",
        href: "/docs/tutorials",
      },
      {
        type: "LINK",
        name: "FAQ",
        href: "/faq",
      },
      {
        type: "LINK",
        name: "Support Center",
        href: "/support",
      },
      {
        type: "EXTERNAL_LINK",
        name: "Status Page",
        href: "https://status.euclideum.com",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        type: "LINK",
        name: "About Us",
        href: "/about",
      },
      {
        type: "LINK",
        name: "Careers",
        href: "/careers",
      },
      {
        type: "LINK",
        name: "Newsroom",
        href: "/news",
      },
      {
        type: "LINK",
        name: "Events",
        href: "/events",
      },
      {
        type: "LINK",
        name: "Partners",
        href: "/partners",
      },
      {
        type: "LINK",
        name: "Contact",
        href: "/contact",
      },
      {
        type: "DROPDOWN",
        name: "Legal",
        links: [
          {
            name: "Privacy Policy",
            href: "/privacy",
          },
          {
            name: "Terms of Service",
            href: "/terms",
          },
          {
            name: "Cookie Policy",
            href: "/cookies",
          },
          {
            name: "GDPR Compliance",
            href: "/gdpr",
          },
          {
            name: "Accessibility",
            href: "/accessibility",
          },
        ],
      },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    icon: Github,
    name: "GitHub",
    href: siteConfig.links.github.url,
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    href: siteConfig.links.linkedin.url,
  },
  {
    icon: Twitter,
    name: "Twitter",
    href: siteConfig.links.twitter.url,
  },
];

const getLink = ({ type, href, name, links }: NavigationLink) => {
  if (type == "EXTERNAL_LINK") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex cursor-pointer items-center gap-0.5 text-sm leading-5 text-muted-foreground hover:text-foreground"
      >
        <div>{name}</div>
        <ExternalLink className="size-3.5" />
      </a>
    );
  }

  if (type == "DROPDOWN") {
    return (
      <>
        <div className="block md:hidden">
          <Drawer>
            <DrawerTrigger className="inline-flex cursor-pointer items-center gap-0.5 text-sm leading-5 text-muted-foreground hover:text-foreground">
              {name}
              <ChevronDown className="size-3.5" />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{name}</DrawerTitle>
                <div>
                  {links?.map((link) => (
                    <Link
                      href={link.href!}
                      className="block cursor-pointer rounded-lg px-2 py-2.5 text-sm hover:bg-muted"
                      key={`drawer-footer-1-${link.name}`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex cursor-pointer items-center gap-0.5 text-sm leading-5 text-muted-foreground hover:text-foreground">
                {name}
                <ChevronDown className="size-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {links?.map((link) => (
                <DropdownMenuItem
                  className="cursor-pointer rounded-lg py-2.5 text-sm"
                  asChild
                  key={`dropdown-footer-1-${link.name}`}
                >
                  <Link href={link.href!}>{link.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </>
    );
  }

  return (
    <Link
      href={href!}
      className="cursor-pointer text-sm leading-5 text-muted-foreground hover:text-foreground"
    >
      {name}
    </Link>
  );
};

export function SiteFooter() {
  const { theme, setTheme } = useTheme();
  const currentYear = new Date().getFullYear();

  const onThemeChange = (value: "light" | "dark" | "system") => {
    if (value) {
      setTheme(value);
    }
  };

  return (
    <>
      <CTASection />
      <section className="py-10 bg-background">
        <footer className="container">
          <div className="flex w-full flex-col gap-6">
            <div className="grid w-full grid-cols-[repeat(2,minmax(auto,15rem))] gap-8 md:grid-cols-[repeat(4,1fr)_5rem] md:gap-0">
              {NAVIGATION.map((section) => (
                <div key={`${section.title}`}>
                  <h2 className="mb-3 text-sm font-medium text-foreground">
                    {section.title}
                  </h2>
                  <ul>
                    {section.links.map((link, i) => (
                      <li key={`${link.name}-${i}`} className="py-1.5">
                        {getLink({
                          name: link.name,
                          href: link.href,
                          type: link?.type,
                          links: link?.links,
                        })}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <h2 className="mb-3 text-sm font-medium text-foreground">
                  Social
                </h2>
                <ul>
                  {SOCIAL_LINKS.map((link, i) => (
                    <li className="py-1.5" key={`social-links-footer-${i}`}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex cursor-pointer items-center gap-2 text-sm leading-5 text-muted-foreground hover:text-foreground"
                      >
                        <link.icon className="size-3.5" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/"
                className="col-[1/3] row-1 block size-9 md:col-[5/6] md:justify-self-end"
              >
                <ThemeLogo
                  width={36}
                  className="size-full object-cover object-center"
                />
              </Link>
            </div>
            <div className="mt-6 flex w-full flex-wrap items-center justify-between gap-4">
              <div>
                <Button asChild variant="ghost" className="text-foreground">
                  <a
                    href="https://status.euclideum.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <div className="relative size-[0.4375rem]">
                      <span className="absolute top-1/2 left-1/2 z-10 size-[0.6875rem] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-green-400/50" />
                      <span className="absolute top-1/2 left-1/2 z-20 size-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500" />
                    </div>
                    All systems operational
                  </a>
                </Button>
              </div>
              <div>
                <ToggleGroup
                  value={theme}
                  onValueChange={onThemeChange}
                  type="single"
                  className="rounded-full border"
                >
                  <ToggleGroupItem
                    value="system"
                    aria-label="Toggle system theme"
                    className="size-6 rounded-full p-0 data-[state=on]:bg-accent"
                  >
                    <MonitorCog className="size-3 text-foreground" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="light"
                    aria-label="Toggle light theme"
                    className="size-6 rounded-full p-0 data-[state=on]:bg-accent"
                  >
                    <Sun className="size-3 text-foreground" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="dark"
                    aria-label="Toggle dark theme"
                    className="size-6 rounded-full p-0 data-[state=on]:bg-accent"
                  >
                    <Moon className="size-3 text-foreground" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
            <div className="mt-3 border-t pt-6">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-sm text-muted-foreground">
                  © {currentYear} {siteConfig.company.legalName}. All rights
                  reserved.
                </p>
                <p className="text-sm text-muted-foreground">
                  {siteConfig.company.tagline}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
}
