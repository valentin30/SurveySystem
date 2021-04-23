import { useCallback, useContext } from 'react'
import { AuthContext, IAuthContext } from '../context/AuthContext'

export interface UseAuth {
    token: string | null
    setToken: (token: string) => void
    logout: () => void
}

export const useAuth = (): UseAuth => {
    const { token, setToken } = useContext<IAuthContext>(AuthContext)

    const logout = useCallback(() => {
        setToken('')
    }, [setToken])

    return {
        token,
        setToken,
        logout
    }
}
