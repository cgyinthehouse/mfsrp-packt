import Post, { type postType } from './Post'
type props = { posts: postType[] }

export default function PostList({ posts }: props) {
  return (
    <div>
      {posts.map((post) => (
        <>
          <Post {...post} />
          <hr />
        </>
      ))}
    </div>
  )
}
