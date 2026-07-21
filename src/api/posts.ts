import type { postType } from '../components/Post'

export const getPosts = async (
  queryParams: Record<string, string>,
): Promise<postType[]> => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts?` +
      new URLSearchParams(queryParams),
  )
  return await res.json()
}

export const getPostById = async (postId: string) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`)
  return await res.json()
}
export const createPost = async (
  post: { title: string; contents?: string },
  token: string,
): Promise<postType> => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  })

  return await res.json()
}
