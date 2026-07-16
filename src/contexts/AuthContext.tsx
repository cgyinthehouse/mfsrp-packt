'use client'
import {
  createContext,
  useState,
  useContext,
  type Dispatch,
  type SetStateAction,
} from 'react'

type AuthContextValue = {
  token: string | null
  setToken: Dispatch<SetStateAction<string | null>>
}

export const AuthContext = createContext<AuthContextValue>({
  token: null,
  setToken: () => {},
})

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [token, setToken] = useState<string | null>(null)
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}
export function useAuth() {
  const { token, setToken } = useContext(AuthContext)
  return [token, setToken] as const
}
