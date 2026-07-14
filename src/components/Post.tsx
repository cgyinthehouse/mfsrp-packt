export type postType = { title: string; contents?: string; author?: string }
const Post = ({ title, contents, author }: postType) => {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      {author && (
        <em>
          <br />
          Written by <strong>{author}</strong>
        </em>
      )}
    </article>
  )
}

export default Post
