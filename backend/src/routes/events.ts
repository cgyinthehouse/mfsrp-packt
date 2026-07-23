import { trackEvent } from '../services/events.js'
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
}
