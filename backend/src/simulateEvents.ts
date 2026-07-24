import { configDotenv } from 'dotenv'
configDotenv()
import { initDatabase } from './db/init.js'
import { Post } from './db/models/post.js'
import { User } from './db/models/user.js'
import { Event } from './db/models/event.js'
import { createUser } from './services/users.js'
import { createPost } from './services/post.js'
import { trackEvent } from './services/events.js'

const simulationStart = Date.now() - 1000 * 60 * 60 * 24 * 30
const simulationEnd = Date.now()

const simulatedUsers = 5
const simulatedPosts = 10
const simulatedViews = 10000

async function simulateEvents() {
  const connection = await initDatabase()

  await User.deleteMany({})
  const createdUsers = await Promise.all(
    Array(simulatedUsers)
      .fill(null)
      .map(
        async (_, u) =>
          await createUser({
            username: `user-${u}`,
            password: `password-${u}`,
          }),
      ),
  )
  console.log(`created ${createdUsers.length} users`)

  await Post.deleteMany({})
  const createdPosts = await Promise.all(
    Array(simulatedPosts)
      .fill(null)
      .map(async (_, p) => {
        const randomUser =
          createdUsers[Math.floor(Math.random() * simulatedUsers)]
        return await createPost(randomUser._id, {
          title: `Test Post ${p}`,
          contents: `This is a test post ${p}`,
        })
      }),
  )
  console.log(`created ${createdPosts.length} posts`)

  await Event.deleteMany({})
  const createdViews = await Promise.all(
    Array(simulatedViews)
      .fill(null)
      .map(async () => {
        const randomPost =
          createdPosts[Math.floor(Math.random() * simulatedPosts)]
        const sessionStart =
          simulationStart + Math.random() * (simulationEnd - simulationStart)
        const sessionEnd =
          sessionStart + 1000 * Math.floor(Math.random() * 60 * 5)
        const event = await trackEvent({
          postId: randomPost._id,
          action: 'startView',
          date: new Date(sessionStart),
        })
        await trackEvent({
          postId: randomPost._id,
          action: 'endView',
          session: event.session,
          date: new Date(sessionEnd),
        })
        return event
      }),
  )
  console.log(`successfully created ${createdViews.length} events`)
  await connection.disconnect()
}

simulateEvents()
