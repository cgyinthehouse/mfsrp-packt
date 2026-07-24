import {
  getDailyDurations,
  getDailyViews,
  getTotalViews,
  trackEvent,
} from '../services/events.js'
import { getPostById } from '../services/post.js'
import type { Request, Response, Router } from 'express'

export function eventRoutes(app: Router) {
  app.post('/api/v1/events', async (req: Request, res: Response) => {
    try {
      const { postId, session, action } = req.body
      const post = await getPostById(postId)
      if (post === null) return res.status(400).end()
      const event = await trackEvent({
        postId,
        action,
        session,
        date: new Date(),
      })
      return res.json({ session: event.session })
    } catch (err) {
      console.error('error tracking action', err)
      return res.status(500).end()
    }
  })

  app.get(
    '/api/v1/events/totalViews/:postId',
    async (req: Request<{ postId: string }>, res: Response) => {
      try {
        const { postId } = req.params
        const post = await getPostById(postId)
        if (post === null) return res.status(400).end()
        const stats = await getTotalViews(post._id)
        return res.json(stats)
      } catch (err) {
        console.error('error getting stats', err)
        return res.status(500).end()
      }
    },
  )
  app.get(
    '/api/v1/events/dailyViews/:postId',
    async (req: Request<{ postId: string }>, res) => {
      try {
        const { postId } = req.params
        const post = await getPostById(postId)
        if (post === null) return res.status(400).end()
        const stats = await getDailyViews(post._id)
        return res.json(stats)
      } catch (err) {
        console.error('error getting stats', err)
        return res.status(500).end()
      }
    },
  )
  app.get(
    '/api/v1/events/dailyDuration/:postId',
    async (req: Request<{ postId: string }>, res) => {
      try {
        const { postId } = req.params
        const post = await getPostById(postId)
        if (post === null) return res.status(400).end()
        const stats = await getDailyDurations(post._id)
        return res.json(stats)
      } catch (err) {
        console.error('error getting stats', err)
        return res.status(500).end()
      }
    },
  )
}
