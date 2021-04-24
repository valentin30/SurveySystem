import { useToast } from '@chakra-ui/toast'
import { useCallback, useEffect, useState } from 'react'
import { SurveyLink } from '../../dto/get/SurveyLink'
import { SurveysResponse } from '../../dto/get/SurveysResponse'
import { SurveyService } from '../../service/SurveyService'

interface UseGetSurveys {
    surveys: SurveyLink[] | null
    loading: boolean
}

export const useGetSurveys = (): UseGetSurveys => {
    const toast = useToast()
    const [surveys, setSurveys] = useState<SurveyLink[] | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const getSurveys = useCallback(async () => {
        setLoading(true)

        try {
            const {
                surveys
            }: SurveysResponse = await SurveyService.getSurveys()
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
    }, [toast])

    useEffect(() => {
        getSurveys()
    }, [getSurveys])

    return { surveys, loading }
}
