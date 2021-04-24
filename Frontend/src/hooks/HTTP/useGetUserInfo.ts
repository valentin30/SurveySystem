import { useToast } from '@chakra-ui/toast'
import { useCallback, useEffect, useState } from 'react'
import { UserDataResponse } from '../../dto/user/UserDataResponse'
import { UserService } from '../../service/UserService'
import { useAuth } from '../useAuth'

interface UseGetUserInfo {
    userData: UserDataResponse | null
    loading: boolean
}

export const useGetUserInfo = (): UseGetUserInfo => {
    const { token } = useAuth()
    const toast = useToast()
    const [loading, setLoading] = useState<boolean>(false)
    const [userData, setUserData] = useState<UserDataResponse | null>(null)

    const getUserInfo = useCallback(async () => {
        if (!token) {
            setUserData(null)
            return
        }

        setLoading(true)

        try {
            setUserData(await UserService.getUserInformation(token))
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right'
            })
        } finally {
            setLoading(false)
        }
    }, [token, toast])

    useEffect(() => {
        getUserInfo()
    }, [getUserInfo])

    return { userData, loading }
}
