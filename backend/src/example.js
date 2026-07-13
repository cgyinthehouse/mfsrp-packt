import { initDatbase } from './db/init.js'
import { Post } from './db/models/post.js'

await initDatbase()

const post = new Post({
  title: 'Hello, Mongoose!',
  author: 'Kent Chen',
  contents: 'This is a test.',
  tags: ['test', 'mongoose'],
})
await post.save()

console.log(await Post.findById(post._id))

console.log('updating...')
await new Promise((resolve) => {
  setTimeout(() => {
    resolve()
  }, 2000)
})

const updatedPost = await Post.findByIdAndUpdate(post._id, {
  $set: {
    title: 'Hello again, Mongoose!!!!',
  },
})

console.log(await Post.findById(updatedPost._id))
