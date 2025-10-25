import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeLogo } from "@/components/theme-logo";
import { Icons } from "@/components/icons";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ThemeLogo className="size-6" />
              <span className="font-bold">{siteConfig.name}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {siteConfig.company.tagline}
            </p>
            <div className="flex space-x-4">
              {siteConfig.links.twitter && (
                <Link
                  href={siteConfig.links.twitter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icons.twitter className="size-5" />
                </Link>
              )}
              {siteConfig.links.linkedin && (
                <Link
                  href={siteConfig.links.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icons.linkedin className="size-5" />
                </Link>
              )}
              {siteConfig.links.github && (
                <Link
                  href={siteConfig.links.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icons.gitHub className="size-5" />
                </Link>
              )}
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="font-semibold">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products/software"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Software Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/products/cloud"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Cloud Infrastructure
                </Link>
              </li>
              <li>
                <Link
                  href="/products/education"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Educational Platforms
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/docs"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {siteConfig.company.legalName}. All rights
              reserved.
            </p>
            <div className="flex gap-4 text-sm">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground"
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
