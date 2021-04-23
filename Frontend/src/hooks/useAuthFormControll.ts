import { useToast } from '@chakra-ui/toast'
import { ChangeEvent, FormEvent, useCallback } from 'react'
import { useHistory, useLocation } from 'react-router'
import { TokenResponse } from '../dto/auth/TokenResponse'
import { AuthService } from '../service/AuthService'
import { SIGN_IN, SIGN_UP } from '../utils/routes'
import { useAuth } from './useAuth'
import { useInput } from './useInput'

type AuthType = typeof SIGN_IN | typeof SIGN_UP

interface UseAuthFormControll {
    submitHandler: (event: FormEvent) => Promise<void>
    input: Input
    search: string
}

interface Input {
    name: InputRecord
    email: InputRecord
    password: InputRecord
}

interface InputRecord {
    value: string
    onChange: (event: ChangeEvent) => void
}

export const useAuthFormControll = (type: AuthType): UseAuthFormControll => {
    const history = useHistory()
    const toast = useToast()
    const { setToken } = useAuth()
    const { search } = useLocation()

    const [name, nameChangeHandler] = useInput()
    const [email, emailChangeHandler] = useInput()
    const [password, passwordChangeHandler] = useInput()

    const submitHandler = useCallback(
        async (event: FormEvent) => {
            event.preventDefault()

            try {
                const { token }: TokenResponse =
                    type === SIGN_UP
                        ? await AuthService.signUp({
                              name,
                              email,
                              password
                          })
                        : await AuthService.signIn({
                              email,
                              password
                          })

                setToken(token)

                const redirectRoute: string =
                    new URLSearchParams(search).get('to') ?? '/'

                history.replace(redirectRoute)
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
        },
        [name, email, password, history, toast, setToken, search, type]
    )

    return {
        submitHandler,
        search,
        input: {
            name: {
                value: name,
                onChange: nameChangeHandler
            },
            email: {
                value: email,
                onChange: emailChangeHandler
            },
            password: {
                value: password,
                onChange: passwordChangeHandler
            }
        }
    }
}
