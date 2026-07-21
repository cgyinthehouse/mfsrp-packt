import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router'
import './index.css'
import App from './App.tsx'
import { routes } from './routes.tsx'

const router = createBrowserRouter(routes as RouteObject[])
hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </StrictMode>,
)
