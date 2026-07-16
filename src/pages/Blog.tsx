import { useQuery } from '@tanstack/react-query'
import CreatePost from '../components/CreatePost'
import PostSorting from '../components/PostSorting'
import PostFilter from '../components/PostFilter'
import PostList from '../components/PostList'
import Header from '../components/Header'
import { getPosts } from '../api/posts'
import { useState } from 'react'
import { useDebounce } from '../hooks'

export default function Blog() {
  const [author, setAuthor] = useState('')
  const debouncedAuthor = useDebounce(author)
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')
  const postsQuery = useQuery({
    queryKey: ['posts', { author: debouncedAuthor, sortBy, sortOrder }],
    queryFn: () => getPosts({ author: debouncedAuthor, sortBy, sortOrder }),
  })

  const posts = postsQuery.data ?? []
  return (
    <div>
      <Header />
      <br />
      <hr />
      <br />
      <CreatePost />
      <br />
      <hr />
      Filter by:
      <PostFilter
        field='author'
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <PostSorting
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}
