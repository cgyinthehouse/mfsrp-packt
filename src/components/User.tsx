import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '../api/users'

export default function User({ id }: { id: string }) {
  const userInfoQuery = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserInfo(id),
  })
  const userInfo = userInfoQuery.data ?? {}
  return <strong>{userInfo.username ?? id}</strong>
}
