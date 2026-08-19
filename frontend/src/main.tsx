import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import './index.css'

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
