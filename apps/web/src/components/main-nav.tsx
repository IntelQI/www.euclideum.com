"use client";

import { Link, usePathname } from "@/navigation";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface MainNavProps {
  messages?: {
    docs: string;
    blog: string;
  };
}

export function MainNav({ messages }: MainNavProps = {}) {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex items-center">
      {/* Logo */}
      <a href="/" className="mr-4 lg:mr-8 flex items-center space-x-2">
        <Icons.logo className="size-5 lg:size-6 text-white" />
        <span className="text-white font-semibold text-base lg:text-lg">
          {siteConfig.name}
        </span>
      </a>

      {/* Navigation Links */}
      <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
        <div className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors cursor-pointer">
          <span className="text-sm">Products</span>
          <Icons.chevronDown className="size-3" />
        </div>

        <div className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors cursor-pointer">
          <span className="text-sm">Resources</span>
          <Icons.chevronDown className="size-3" />
        </div>

        <div className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors cursor-pointer">
          <span className="text-sm">Solutions</span>
          <Icons.chevronDown className="size-3" />
        </div>

        <div className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors cursor-pointer">
          <span className="text-sm">Company</span>
          <Icons.chevronDown className="size-3" />
        </div>

        <a
          href="/pricing"
          className="text-white hover:text-gray-300 transition-colors text-sm"
        >
          Pricing
        </a>
      </nav>
    </div>
  );
}
