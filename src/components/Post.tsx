import User from '../components/User'
export type postType = {
  title: string
  contents?: string
  author?: string
  _id?: string
}
const Post = ({ title, contents, author }: postType) => {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      {author && (
        <em>
          <br />
          Written by <User id={author} />
        </em>
      )}
    </article>
  )
}

export default Post
