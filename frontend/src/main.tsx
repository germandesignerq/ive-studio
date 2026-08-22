import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import { autoLocaleRedirect } from './i18n/detect'
import './index.css'

// Язык выбирается до монтирования: иначе посетитель успел бы увидеть
// английскую страницу, и только потом её сменил бы редирект.
if (!autoLocaleRedirect()) {
  const root = document.getElementById('root')!

  const tree = (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  )

  // Пререндер кладёт готовую разметку — тогда её нужно оживить, а не перерисовать.
  if (root.dataset.prerendered === 'true') hydrateRoot(root, tree)
  else createRoot(root).render(tree)

  // Считаем визит только на той странице, на которой посетитель остался, —
  // см. send_page_view: false в index.html.
  window.gtag?.('event', 'page_view')
}
