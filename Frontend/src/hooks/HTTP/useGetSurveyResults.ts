import { useToast } from '@chakra-ui/toast'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { AuthContext, IAuthContext } from '../../context/AuthContext'
import { SurveyResultsResponse } from '../../dto/results/SurveyResultsResponse'
import { PathVariable } from '../../pages/SurveyResults'
import { SurveyService } from '../../service/SurveyService'
import { QUERY, TO } from '../../utils/query'
import { RESULTS, SIGN_IN, SURVEY } from '../../utils/routes'

interface Params {
    id: string
    privateKey: string
}

interface UseGetSurveyResults {
    survey: SurveyResultsResponse | null
    loading: boolean
    toggleSurveyHandler: () => Promise<void>
}

export const useGetSurveyResults = (
    pathVariableName: PathVariable
): UseGetSurveyResults => {
    const { token } = useContext<IAuthContext>(AuthContext)
    const { [pathVariableName]: key } = useParams<Params>()
    const history = useHistory()
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<SurveyResultsResponse | null>(null)

    const getSrviceResultsHandler = useCallback(async () => {
        setLoading(true)

        if (pathVariableName === 'id' && !token) {
            history.replace(SIGN_IN + QUERY + TO + SURVEY + '/' + key + RESULTS)
            return
        }
        try {
            if (!token) {
                setData(await SurveyService.getSurveyResultsNoAuth(key))
                return
            }

            setData(await SurveyService.getSurveyResults({ id: +key, token }))
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
    }, [token, key, history, pathVariableName, toast])

    const toggleSurveyHandler = useCallback(async () => {
        if (!token || !data) {
            return
        }

        try {
            await SurveyService.modifySurvey(data.id, token)

            setData(data => {
                if (!data) {
                    return data
                }

                return {
                    ...data,
                    closed: !data.closed
                }
            })
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
    }, [token, data, toast])

    useEffect(() => {
        getSrviceResultsHandler()
    }, [getSrviceResultsHandler])

    return { survey: data, loading, toggleSurveyHandler }
}
