import { useToast } from '@chakra-ui/toast'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { AuthContext, IAuthContext } from '../../context/AuthContext'
import { UserSurvey } from '../../dto/user/UserSurvey'
import { UserSurveysResponse } from '../../dto/user/UserSurveysResponse'
import { SurveyService } from '../../service/SurveyService'
import { QUERY, TO } from '../../utils/query'
import { SIGN_IN, SURVEY, USER } from '../../utils/routes'

interface UseGetUserSurveys {
    surveys: UserSurvey[] | null
    loading: boolean
}

export const useGetUserSurveys = (): UseGetUserSurveys => {
    const toast = useToast()
    const { token } = useContext<IAuthContext>(AuthContext)
    const history = useHistory()
    const [loading, setLoading] = useState<boolean>(false)
    const [surveys, setSurveys] = useState<UserSurvey[] | null>(null)

    const getSurveys = useCallback(async () => {
        setLoading(true)

        try {
            if (!token) {
                history.replace(SIGN_IN + QUERY + TO + SURVEY + USER)
                return
            }

            const {
                surveys
            }: UserSurveysResponse = await SurveyService.getUserSurveys(token)

            setSurveys(surveys)
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
    }, [toast, token, history])

    useEffect(() => {
        getSurveys()
    }, [getSurveys])

    return { surveys, loading }
}
