import { useToast } from '@chakra-ui/toast'
import { useCallback, useEffect, useState } from 'react'
import { Question } from '../../dto/get/Question'
import { SurveyResponse } from '../../dto/get/SurveyResponse'
import { SubmittedQuestion } from '../../dto/submit/SubmittedQuestion'
import { SurveyService } from '../../service/SurveyService'

interface UseGetSurvey {
    survey: SurveyResponse | null
    answers: SubmittedQuestion[] | null
    onRadioChange: (id: number) => (value: string) => void
    onCheckboxChange: (id: number) => (answerId: number) => void
    loading: boolean
}

export const useGetSurvey = (publicKey: string): UseGetSurvey => {
    const toast = useToast()

    const [survey, setSurvey] = useState<SurveyResponse | null>(null)
    const [loading, setLoading] = useState(false)
    const [answers, setAnswers] = useState<SubmittedQuestion[]>([])

    const getSurvey = useCallback(async () => {
        setLoading(true)

        try {
            const survey: SurveyResponse = await SurveyService.getSurveyByPublicKey(
                publicKey
            )
            const answers: SubmittedQuestion[] = survey.questions.map(
                (question: Question) => ({ id: question.id, answerIds: [] })
            )

            setSurvey(survey)
            setAnswers(answers)
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
    }, [publicKey, toast])

    const onRadioChange = useCallback(
        (id: number) => {
            return (value: string) => {
                setAnswers((answers: SubmittedQuestion[]) => {
                    return [
                        ...answers.filter(a => a.id !== id),
                        { id, answerIds: [+value] }
                    ]
                })
            }
        },

        []
    )
    const onCheckboxChange = useCallback((id: number) => {
        return (answerId: number) => {
            setAnswers((answers: SubmittedQuestion[]) => {
                const answer: SubmittedQuestion | undefined = answers.find(
                    a => a.id === id
                )

                if (!answer) {
                    return answers
                }

                if (!answer.answerIds.includes(answerId)) {
                    return [
                        ...answers.filter(a => a.id !== id),
                        { id, answerIds: [...answer.answerIds, +answerId] }
                    ]
                }

                return [
                    ...answers.filter(a => a.id !== id),
                    {
                        id,
                        answerIds: answer.answerIds.filter(a => a !== answerId)
                    }
                ]
            })
        }
    }, [])

    useEffect(() => {
        getSurvey()
    }, [getSurvey])

    return { survey, answers, onCheckboxChange, onRadioChange, loading }
}
