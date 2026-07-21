import User from '../components/User'
import { Link } from 'react-router'

export type postType = {
  title: string
  contents?: string
  author?: string
  _id: string
  fullPost: boolean
}
const Post = ({ title, contents, author, _id, fullPost }: postType) => {
  return (
    <article>
      {fullPost ? (
        <h3>{title}</h3>
      ) : (
        <Link to={`/posts/${_id}`}>
          <h3>{title}</h3>
        </Link>
      )}
      {fullPost && <div>{contents}</div>}
      {author && (
        <em>
          {fullPost && <br />}
          Written by <User id={author} />
        </em>
      )}
    </article>
  )
}

export default Post
