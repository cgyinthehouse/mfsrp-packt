import type { Types } from 'mongoose'
import { Post } from '../db/models/post.js'
import { User } from '../db/models/user.js'

interface PostInput {
  title: string
  contents?: string
  tags?: string[]
}

export async function createPost(
  userId: Types.ObjectId | string,
  { title, contents, tags }: PostInput,
) {
  const post = new Post({
    title,
    author: userId,
    contents,
    tags,
  })
  return await post.save()
}

interface PostQuery {
  author?: Types.ObjectId | string
  tags?: string | string[]
}

interface ListOptions {
  sortBy?: string
  sortOrder?: 'ascending' | 'descending'
}

async function listPosts(
  query: PostQuery = {},
  { sortBy = 'createdAt', sortOrder = 'descending' }: ListOptions = {},
) {
  return await Post.find(query).sort({ [sortBy]: sortOrder })
}

export async function listAllPosts(options?: ListOptions) {
  return await listPosts({}, options)
}
export async function listPostsByTag(
  tags: string | string[],
  options?: ListOptions,
) {
  return await listPosts({ tags }, options)
}

export async function listPostsByAuthor(
  authorUsername: string,
  options?: ListOptions,
) {
  const user = await User.findOne({ username: authorUsername })
  if (!user) return []
  return await listPosts({ author: user._id }, options)
}

export async function getPostById(postId: string) {
  return await Post.findById(postId)
}

export async function updatePost(
  userId: Types.ObjectId | string,
  postId: string,
  { title, contents, tags }: Partial<PostInput>,
) {
  return await Post.findOneAndUpdate(
    { _id: postId, author: userId },
    { $set: { title, contents, tags } },
    { returnDocument: 'after' },
  )
}
export async function deletePost(
  userId: Types.ObjectId | string,
  postId: string,
) {
  return await Post.deleteOne({ _id: postId, author: userId })
}
