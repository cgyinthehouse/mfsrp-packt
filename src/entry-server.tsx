import type { Request } from 'express'
import ReactDOMServer from 'react-dom/server'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
  type RouteObject,
} from 'react-router'
import App from './App'
import { routes } from './routes'
import { createFetchRequest } from './request'

const handler = createStaticHandler(routes as RouteObject[])

export async function render(req: Request) {
  const fetchRequest = createFetchRequest(req)
  const context = await handler.query(fetchRequest)
  if (context instanceof Response) {
    throw context
  }
  const router = createStaticRouter(handler.dataRoutes, context)

  return ReactDOMServer.renderToString(
    <App>
      <StaticRouterProvider router={router} context={context} />
    </App>,
  )
}
