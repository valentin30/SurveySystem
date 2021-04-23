import { useToast } from '@chakra-ui/toast'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { SurveyLink } from '../../dto/get/SurveyLink'
import { SurveysResponse } from '../../dto/get/SurveysResponse'
import { SurveyService } from '../../service/SurveyService'
import { useInput } from '../useInput'

interface UseGetSurveys {
    surveys: SurveyLink[] | null
}

export const useGetSurveys = (): UseGetSurveys => {
    const toast = useToast()
    const [surveys, setSurveys] = useState<SurveyLink[] | null>(null)

    const getSurveys = useCallback(async () => {
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
        }
    }, [toast])

    useEffect(() => {
        getSurveys()
    }, [getSurveys])

    return { surveys }
}
