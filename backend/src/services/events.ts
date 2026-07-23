import { v4 as uuidv4 } from 'uuid'
import type { Types } from 'mongoose'
import { Event } from '../db/models/event.js'

interface TrackEventInput {
  postId: Types.ObjectId | string
  action: string
  session: string
  date: number | Date
}

export async function trackEvent({
  postId,
  action,
  session = uuidv4(),
  date = Date.now(),
}: TrackEventInput) {
  const event = new Event({ post: postId, action, session, date })
  return await event.save()
}
