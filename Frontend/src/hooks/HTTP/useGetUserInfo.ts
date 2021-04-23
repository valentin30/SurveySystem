import { useToast } from '@chakra-ui/toast'
import { useCallback, useEffect, useState } from 'react'
import { UserDataResponse } from '../../dto/user/UserDataResponse'
import { UserService } from '../../service/UserService'
import { useAuth } from '../useAuth'

export const useGetUserInfo = (): UserDataResponse | null => {
    const { token } = useAuth()
    const toast = useToast()

    const [userData, setUserData] = useState<UserDataResponse | null>(null)

    const getUserInfo = useCallback(async () => {
        if (!token) {
            setUserData(null)
            return
        }

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
        }
    }, [token, toast])

    useEffect(() => {
        getUserInfo()
    }, [getUserInfo])

    return userData
}
