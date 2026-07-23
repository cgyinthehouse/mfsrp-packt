import { MongoMemoryServer } from 'mongodb-memory-server'

declare global {
  var __MONGOINSTANCE: MongoMemoryServer
}

export default async function globalSetup() {
  const instance = await MongoMemoryServer.create({
    binary: {
      version: '8.0.8',
    },
  })
  global.__MONGOINSTANCE = instance
  process.env.DATABASE_URL = instance.getUri()
}
