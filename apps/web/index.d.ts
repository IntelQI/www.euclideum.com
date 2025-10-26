import type { IntlMessages as Messages } from "./src/lib/opendocs/types/i18n";

declare global {
  interface IntlMessages extends Messages {}

  type AbstractIntlMessages = Messages;
}

// Type declarations for next/og JSX with tw prop
declare module "react" {
  interface HTMLAttributes<T> {
    tw?: string;
  }

  // Support for async React Server Components
  namespace JSX {
    interface IntrinsicAttributes {
      [key: string]: any;
    }
  }
}

// Augment React types to support async server components
declare module "react" {
  function use<T>(promise: Promise<T>): T;
}

declare namespace React {
  type AsyncComponent<P = {}> = (props: P) => Promise<JSX.Element | null>;
  type ReactNode =
    | ReactElement
    | string
    | number
    | ReactFragment
    | ReactPortal
    | boolean
    | null
    | undefined
    | Promise<ReactNode>;
}
