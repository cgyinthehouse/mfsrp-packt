import { useLoaderData } from 'react-router'
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query'
import Blog from './pages/Blog'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { getPosts } from './api/posts'
import { getUserInfo } from './api/users'

export const routes = [
  {
    path: '/',
    loader: async () => {
      const queryClient = new QueryClient()
      const author = ''
      const sortBy = 'createdAt'
      const sortOrder = 'descending'
      const posts = await getPosts({ author, sortBy, sortOrder })
      await queryClient.prefetchQuery({
        queryKey: ['posts', { author, sortBy, sortOrder }],
        queryFn: () => posts,
      })
      const uniqueAuthors = posts
        .map((post) => post.author)
        .filter((value): value is string => typeof value === 'string')
        .filter((value, index, array) => array.indexOf(value) === index)
      for (const username of uniqueAuthors) {
        await queryClient.prefetchQuery({
          queryKey: ['user', username],
          queryFn: () => getUserInfo(username),
        })
      }
      return dehydrate(queryClient)
    },
    Component() {
      const dehydratedState = useLoaderData()
      return (
        <HydrationBoundary state={dehydratedState}>
          <Blog />
        </HydrationBoundary>
      )
    },
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]
