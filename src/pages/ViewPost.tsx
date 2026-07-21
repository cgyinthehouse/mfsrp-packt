import { Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import Header from '../components/Header'
import Post from '../components/Post'
import { getPostById } from '../api/posts'

export function ViewPost({ postId }: { postId: string }) {
  const postQuery = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
  })
  const post = postQuery.data
  return (
    <div style={{ padding: 8 }}>
      <Header />
      <br />
      <hr />
      <Link to='/'>Back to main page</Link>
      <br />
      <hr />
      {post ? <Post {...post} fullPost /> : `Post with id ${postId} not found.`}
    </div>
  )
}
