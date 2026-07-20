import Post, { type postType } from './Post'
type props = { posts: postType[] }
import { Fragment } from 'react'

export default function PostList({ posts }: props) {
  return (
    <div>
      {posts.map((post) => (
        <Fragment key={post._id}>
          <Post {...post} />
          <hr />
        </Fragment>
      ))}
    </div>
  )
}
