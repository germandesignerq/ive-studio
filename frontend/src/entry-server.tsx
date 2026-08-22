import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'

/** Рендер одного маршрута в строку — вызывается пререндером на сборке. */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}

export { allRoutes, feedFor, metaFor } from './lib/seo'
export { buildHead, renderHead } from './lib/head'
export { HTML_LANG, LOCALES, SITE_URL, localePath } from './lib/site'
