/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  /** Google Analytics; может не подняться — блокировщики режут gtag.js. */
  gtag?: (...args: unknown[]) => void
}
