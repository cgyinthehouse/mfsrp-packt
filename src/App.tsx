import CreatePost from './components/CreatePost'
import PostSorting from './components/PostSorting'
import PostFilter from './components/PostFilter'
import PostList from './components/PostList'

const posts = [
  {
    title: 'Full Stack React Proejcts',
    contents: "Let's become full-stack developers!",
    author: 'Daniel Bugl',
  },
]

export default function App() {
  return (
    <div>
      <CreatePost />
      <br />
      <hr />
      Filter by:
      <PostFilter field='author' />
      <br />
      <PostSorting fields={['createdAt', 'updatedAt']} />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}
