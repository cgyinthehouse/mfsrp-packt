import mongoose from 'mongoose'
import { describe, test, expect, beforeEach } from '@jest/globals'
import {
  createPost,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPostById,
  updatePost,
  deletePost,
} from '../services/post.js'
import { Post } from '../db/models/post.js'
import { User } from '../db/models/user.js'

let authorId

beforeEach(async () => {
  await User.deleteMany({})
  const author = await User.create({
    username: 'Daniel Bugl',
    password: 'password',
  })
  authorId = author._id
})

describe('creating posts', () => {
  test('with all parameters should succeed', async () => {
    const post = {
      title: 'Hello Mongoose!',
      contents: 'This post is stored in a MongoDB databse using Mongoose.',
      tags: ['mongodb', 'mongoose'],
    }
    const createdPost = await createPost(authorId, post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)

    const foundPost = await Post.findById(createdPost._id)
    expect(foundPost).toEqual(
      expect.objectContaining({ ...post, author: authorId }),
    )
    expect(foundPost.createdAt).toBeInstanceOf(Date)
    expect(foundPost.updatedAt).toBeInstanceOf(Date)
  })

  test('without title should fail', async () => {
    const post = {
      contents: 'Post with no title',
      tags: ['empty'],
    }
    try {
      await createPost(authorId, post)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`title` is required')
    }
  })

  test('with minimal parameters should succeed', async () => {
    const post = {
      title: 'only a title',
    }
    const createdPost = await createPost(authorId, post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})

const samplePosts = [
  { title: 'Learning Redux', tags: ['redux'] },
  { title: 'Learn React Hooks', tags: ['react'] },
  { title: 'Full-Stack React Projects', tags: ['react', 'nodejs'] },
]

let createdSamplePosts

beforeEach(async () => {
  await Post.deleteMany({})
  createdSamplePosts = await Promise.all(
    samplePosts.map((post) => createPost(authorId, post)),
  )
})

describe('listing posts', () => {
  test('should list all posts', async () => {
    const posts = await listAllPosts()
    expect(posts.length).toEqual(createdSamplePosts.length)
  })

  test('should return posts sorted by creation date descending by default', async () => {
    const posts = await listAllPosts()
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => b.createdAt - a.createdAt,
    )
    expect(posts.map((post) => post.createdAt)).toEqual(
      sortedSamplePosts.map((post) => post.createdAt),
    )
  })

  test('should take into account provided sorting options', async () => {
    const posts = await listAllPosts({
      sortBy: 'updateAt',
      sortOrder: 'ascending',
    })
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => a.updatedAt - b.updatedAt,
    )
    expect(posts.map((post) => post.updatedAt)).toEqual(
      sortedSamplePosts.map((post) => post.updatedAt),
    )
  })

  test('should be able to filter posts by author', async () => {
    const posts = await listPostsByAuthor('Daniel Bugl')
    expect(posts.length).toEqual(3)
  })

  test('should return an empty array for an unknown author', async () => {
    const posts = await listPostsByAuthor('unknown user')
    expect(posts).toEqual([])
  })

  test('should be able to filter posts by tag', async () => {
    const posts = await listPostsByTag('nodejs')
    expect(posts.length).toEqual(1)
  })
})

describe('getting a post', () => {
  test('should return the full post', async () => {
    const post = await getPostById(createdSamplePosts[0]._id)
    expect(post.toObject()).toEqual(createdSamplePosts[0].toObject())
  })
  test('should fail if the id does not exist', async () => {
    const post = await getPostById('000000000000000000000000')
    expect(post).toBeNull()
  })
})

describe('updating posts', () => {
  test('should update the specified property', async () => {
    await updatePost(authorId, createdSamplePosts[0]._id, {
      title: 'Updated Title',
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.title).toEqual('Updated Title')
  })

  test('should not update other properties', async () => {
    await updatePost(authorId, createdSamplePosts[0]._id, {
      title: 'Updated Title',
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.tags).toEqual(createdSamplePosts[0].tags)
  })

  test('should update the updatedAt timestamp', async () => {
    await updatePost(authorId, createdSamplePosts[0]._id, {
      title: 'Updated Title',
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.updatedAt.getTime()).toBeGreaterThan(
      createdSamplePosts[0].updatedAt.getTime(),
    )
  })
  test('should fail if the id does not exist', async () => {
    const post = await updatePost(authorId, '000000000000000000000000', {
      title: 'Updated Title',
    })
    expect(post).toBeNull()
  })
})

describe('deleting posts', () => {
  test('should remove the post from the database', async () => {
    const result = await deletePost(authorId, createdSamplePosts[0]._id)
    expect(result.deletedCount).toEqual(1)
    const deletedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(deletedPost).toBeNull()
  })
  test('should fail if the id does not exist', async () => {
    const result = await deletePost(authorId, '000000000000000000000000')
    expect(result.deletedCount).toEqual(0)
  })
})
