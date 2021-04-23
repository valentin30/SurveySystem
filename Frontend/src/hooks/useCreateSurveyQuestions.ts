import { ChangeEvent, ChangeEventHandler, useCallback, useState } from 'react'
import { v4 } from 'uuid'
import { CreateQuestion } from '../dto/create/CreateQuestion'

interface UseCreateSurveyQuestions {
    questions: Question[]
    addQuestionHandler: () => void
    removeQuestionHandlerGenerator: (id: string) => () => void
    questionChangeHandlerGenerator: (id: string) => ChangeEventHandler
    isRequiredChangeHandlerGenerator: (id: string) => () => void
    isMultipleChangeHandlerGenerator: (id: string) => () => void
    addAnswerHandlerGenerator: (id: string) => () => void
    answerChangeHandlerGenerator: (
        id: string
    ) => (index: number) => ChangeEventHandler
    removeAnswerHandlerGenerator: (id: string) => (index: number) => () => void
}

export interface Question extends CreateQuestion {
    id: string
}

export const useCreateSurveyQuestions = (): UseCreateSurveyQuestions => {
    const [questions, setQuestions] = useState<Question[]>([
        {
            id: v4(),
            question: '',
            answers: ['', ''],
            isRequired: true,
            isMultiple: false
        }
    ])

    const addQuestionHandler = useCallback(() => {
        setQuestions((questions: Question[]) => {
            return [
                ...questions,
                {
                    id: v4(),
                    question: '',
                    answers: ['', ''],
                    isRequired: true,
                    isMultiple: false
                }
            ]
        })
    }, [])

    const removeQuestionHandlerGenerator = useCallback((id: string) => {
        return () => {
            setQuestions((questions: Question[]) => {
                if (questions.length <= 1) {
                    return questions
                }

                return questions.filter(
                    (question: Question) => question.id !== id
                )
            })
        }
    }, [])

    const questionChangeHandlerGenerator = useCallback((id: string) => {
        return (event: ChangeEvent<HTMLInputElement>) => {
            setQuestions((questions: Question[]) => {
                const questionIndex: number = questions.findIndex(
                    (question: Question) => question.id === id
                )

                if (questionIndex === -1) {
                    return questions
                }

                const question = questions[questionIndex]

                return [
                    ...questions.slice(0, questionIndex),
                    { ...question, question: event.target.value },
                    ...questions.slice(questionIndex + 1)
                ]
            })
        }
    }, [])

    const isRequiredChangeHandlerGenerator = useCallback((id: string) => {
        return () => {
            setQuestions((questions: Question[]) => {
                const questionIndex: number = questions.findIndex(
                    (question: Question) => question.id === id
                )

                if (questionIndex === -1) {
                    return questions
                }

                const question = questions[questionIndex]

                return [
                    ...questions.slice(0, questionIndex),
                    { ...question, isRequired: !question.isRequired },
                    ...questions.slice(questionIndex + 1)
                ]
            })
        }
    }, [])

    const isMultipleChangeHandlerGenerator = useCallback((id: string) => {
        return () => {
            setQuestions((questions: Question[]) => {
                const questionIndex: number = questions.findIndex(
                    (question: Question) => question.id === id
                )

                if (questionIndex === -1) {
                    return questions
                }

                const question = questions[questionIndex]

                return [
                    ...questions.slice(0, questionIndex),
                    { ...question, isMultiple: !question.isMultiple },
                    ...questions.slice(questionIndex + 1)
                ]
            })
        }
    }, [])

    const addAnswerHandlerGenerator = useCallback((id: string) => {
        return () => {
            setQuestions((questions: Question[]) => {
                const questionIndex: number = questions.findIndex(
                    (question: Question) => question.id === id
                )

                if (questionIndex === -1) {
                    return questions
                }

                const question = questions[questionIndex]

                return [
                    ...questions.slice(0, questionIndex),
                    { ...question, answers: [...question.answers, ''] },
                    ...questions.slice(questionIndex + 1)
                ]
            })
        }
    }, [])

    const answerChangeHandlerGenerator = useCallback((id: string) => {
        return (index: number) => {
            return (event: ChangeEvent<HTMLInputElement>) => {
                setQuestions((questions: Question[]) => {
                    const questionIndex: number = questions.findIndex(
                        (question: Question) => question.id === id
                    )

                    if (questionIndex === -1) {
                        return questions
                    }

                    const question = questions[questionIndex]

                    return [
                        ...questions.slice(0, questionIndex),
                        {
                            ...question,
                            answers: [
                                ...question.answers.slice(0, index),
                                event.target.value,
                                ...question.answers.slice(index + 1)
                            ]
                        },
                        ...questions.slice(questionIndex + 1)
                    ]
                })
            }
        }
    }, [])

    const removeAnswerHandlerGenerator = useCallback((id: string) => {
        return (index: number) => {
            return () => {
                setQuestions((questions: Question[]) => {
                    const questionIndex: number = questions.findIndex(
                        (question: Question) => question.id === id
                    )

                    if (questionIndex === -1) {
                        return questions
                    }

                    const question = questions[questionIndex]

                    if (question.answers.length <= 2) {
                        return questions
                    }

                    return [
                        ...questions.slice(0, questionIndex),
                        {
                            ...question,
                            answers: question.answers.filter(
                                (_, i: number) => i !== index
                            )
                        },
                        ...questions.slice(questionIndex + 1)
                    ]
                })
            }
        }
    }, [])

    return {
        questions,
        addQuestionHandler,
        addAnswerHandlerGenerator,
        removeAnswerHandlerGenerator,
        answerChangeHandlerGenerator,
        questionChangeHandlerGenerator,
        removeQuestionHandlerGenerator,
        isMultipleChangeHandlerGenerator,
        isRequiredChangeHandlerGenerator
    }
}
