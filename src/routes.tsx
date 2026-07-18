import Blog from './pages/Blog'
import Login from './pages/Login'
import Signup from './pages/Signup'

export const routes = [
  {
    path: '/',
    element: <Blog />,
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
