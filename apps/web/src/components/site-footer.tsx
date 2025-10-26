import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeLogo } from "@/components/theme-logo";
import { Icons } from "@/components/icons";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <ThemeLogo className="size-8" />
              <span className="text-lg font-bold tracking-tight text-foreground">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {siteConfig.company.tagline}
            </p>
            <div className="flex items-center space-x-3 pt-2">
              {siteConfig.links.twitter && (
                <Link
                  href={siteConfig.links.twitter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={siteConfig.links.twitter.label}
                >
                  <Icons.twitter className="size-5" />
                </Link>
              )}
              {siteConfig.links.linkedin && (
                <Link
                  href={siteConfig.links.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={siteConfig.links.linkedin.label}
                >
                  <Icons.linkedin className="size-5" />
                </Link>
              )}
              {siteConfig.links.github && (
                <Link
                  href={siteConfig.links.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={siteConfig.links.github.label}
                >
                  <Icons.gitHub className="size-5" />
                </Link>
              )}
            </div>
          </div>

          {/* Products */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Products
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products/software"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Software Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/products/cloud"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Cloud Infrastructure
                </Link>
              </li>
              <li>
                <Link
                  href="/products/education"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Educational Platforms
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {siteConfig.company.legalName}. All rights
              reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
