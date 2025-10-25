import { getTranslations } from 'next-intl/server'
import dynamic from 'next/dynamic'

import { ThemeModeToggle } from '@/components/theme-mode-toggle'
import { Separator } from '@/components/ui/separator'
import { VersionDropdown } from './version-dropdown'
import { MobileNav } from '@/components/mobile-nav'
import { MainNav } from '@/components/main-nav'
import { buttonVariants } from './ui/button'
import { Icons } from '@/components/icons'
import { siteConfig } from '@/config/site'
import { I18nToggle } from './i18n-toggle'
import { Link } from '@/navigation'
import { cn } from '@/lib/utils'

const CommandMenu = dynamic(() =>
  import('@/components/command-menu').then((mod) => mod.CommandMenu)
)

export async function SiteHeader() {
  const t = await getTranslations('site')

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Green top border */}
      <div className="h-0.5 bg-[#00ED64]"></div>
      
      {/* Main header */}
      <div className="bg-[#001E2B] py-2 md:py-3">
        <div className="container flex h-14 md:h-16 max-w-screen-2xl items-center px-4 md:px-6">
          {/* Mobile Navigation - Only visible on mobile */}
          <MobileNav
            messages={{
              menu: t('words.menu'),
              toggleMenu: t('buttons.toggle_menu'),
            }}
            menuLinks={<SiteHeaderMenuLinks />}
          />

          {/* Desktop Navigation - Hidden on mobile */}
          <MainNav
            messages={{
              docs: t('words.docs'),
              blog: t('words.blog'),
            }}
          />

          {/* Right side actions */}
          <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4 lg:space-x-6">
            {/* Search Icon - Always visible */}
            <button className="text-white hover:text-gray-300 transition-colors p-1">
              <Icons.search className="size-4 md:size-5" />
            </button>

            {/* Language Selector - Hidden on small screens, visible on md+ */}
            <div className="hidden md:flex items-center space-x-1 text-white hover:text-gray-300 transition-colors cursor-pointer">
              <Icons.globe className="size-4" />
              <span className="text-sm">Eng</span>
              <Icons.chevronDown className="size-3" />
            </div>

            {/* Support Link - Hidden on small screens, visible on lg+ */}
            <a href="/support" className="hidden lg:block text-white hover:text-gray-300 transition-colors text-sm">
              Support
            </a>

            {/* Get Started Link - Hidden on small screens, visible on lg+ */}
            <a href="/get-started" className="hidden lg:block text-white hover:text-gray-300 transition-colors text-sm">
              Get Started
            </a>

            {/* Sign In Button - Always visible but smaller on mobile */}
            <a href="/signin">
              <button className="bg-[#00ED64] hover:bg-[#00D55A] text-black font-medium px-2 py-1 md:px-4 md:py-2 rounded-md text-xs md:text-sm transition-colors">
                Sign In
              </button>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export function SiteHeaderMenuLinks() {
  return (
    <>
      <a href={siteConfig.links.github.url} target="_blank" rel="noreferrer">
        <div
          className={cn(
            buttonVariants({
              variant: 'ghost',
            }),
            'w-9 px-0'
          )}
        >
          <Icons.gitHub className="size-4" />
          <span className="sr-only">GitHub</span>
        </div>
      </a>
    </>
  )
}
