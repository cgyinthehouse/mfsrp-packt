interface trackEventInput {
  postId: string
  action: string
  session: string | undefined
}
export const postTrackEvent = (event: trackEventInput) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
  }).then((res) => res.json())

export const getTotalViews = async (
  postId: string,
): Promise<{ views: number }> => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/events/totalViews/${postId}`,
  )
  return res.json()
}

export const getDailyViews = async (postId: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/events/dailyViews/${postId}`,
  )
  return res.json()
}
export const getDailyDurations = async (postId: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/events/dailyDurations/${postId}`,
  )
  return res.json()
}
