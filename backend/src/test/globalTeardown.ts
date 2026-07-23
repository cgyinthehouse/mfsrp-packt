import type { MongoMemoryServer } from 'mongodb-memory-server'

declare global {
  var __MONGOINSTANCE: MongoMemoryServer
}

export default async function globalTeardown() {
  await global.__MONGOINSTANCE.stop()
}
