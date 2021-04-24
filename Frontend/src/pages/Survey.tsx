import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Box, Heading, Text } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'
import { FormEvent, FunctionComponent, useCallback, useState } from 'react'
import { useParams } from 'react-router'
import { CheckBoxAnswerGroup } from '../components/Answers/CheckBoxAnswerGroup'
import { RadioAnswerGroup } from '../components/Answers/RadioAnswerGroup'
import { Container } from '../components/Box/Container'
import { PrimaryButton } from '../components/Ui/Button/PrimaryButton'
import { PrimaryButtonLink } from '../components/Ui/Button/PrimaryButtonLink'
import { Loader } from '../components/Ui/Loader'
import { PrimaryTextColor, SecondaryTextColor } from '../config/colors'
import { Question } from '../dto/get/Question'
import { SubmittedQuestion } from '../dto/submit/SubmittedQuestion'
import { useGetSurvey } from '../hooks/HTTP/useGetSurvey'
import { SurveyService } from '../service/SurveyService'

interface Params {
    publicKey: string
}

export const Survey: FunctionComponent = () => {
    const { publicKey } = useParams<Params>()

    const [success, setSuccess] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const { survey, answers, onCheckboxChange, onRadioChange } = useGetSurvey(
        publicKey
    )

    const toast = useToast()

    const submitHandler = useCallback(
        async (event: FormEvent) => {
            event.preventDefault()
            setLoading(true)
            try {
                await SurveyService.submitSurvey(publicKey, {
                    questions: answers ?? []
                })
                setSuccess(true)
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
        },
        [answers, publicKey, toast]
    )

    if (loading) {
        return (
            <Loader
                position='fixed'
                top='30%'
                left='0'
                right='0'
                margin='auto'
            />
        )
    }

    if (!survey) {
        return null
    }

    if (success) {
        return (
            <Box pt='20vh'>
                <Container>
                    <Heading color={PrimaryTextColor} size='xl' mb='2rem'>
                        Your response <br /> was saved successfully.
                    </Heading>
                    <PrimaryButtonLink size='lg' to='/'>
                        Back To Home
                    </PrimaryButtonLink>
                </Container>
            </Box>
        )
    }

    return (
        <Box pt='3rem' pb='3rem' as='form' onSubmit={submitHandler}>
            <Container>
                <Heading color={PrimaryTextColor} size='xl'>
                    {survey.title}
                </Heading>
                <Text mt='0.5rem' color={SecondaryTextColor}>
                    {survey.subtitle}
                </Text>
            </Container>
            {survey.questions.map((question: Question, index: number) => {
                const answer: SubmittedQuestion | undefined = answers?.find(
                    a => a.id === question.id
                )

                if (!answer) {
                    return null
                }

                return (
                    <Container key={question.id} mt='1.5rem'>
                        <FormControl isRequired={question.isRequired}>
                            <FormLabel display='flex'>
                                <Heading
                                    color={PrimaryTextColor}
                                    size='md'
                                    mb='1rem'>
                                    {index + 1}. {question.content}
                                </Heading>
                            </FormLabel>

                            {question.isMultiple ? (
                                <CheckBoxAnswerGroup
                                    answers={question.answers}
                                    onChange={onCheckboxChange(question.id)}
                                    values={answer.answerIds}
                                />
                            ) : (
                                <RadioAnswerGroup
                                    answers={question.answers}
                                    onChange={onRadioChange(question.id)}
                                    value={answer.answerIds[0]}
                                />
                            )}
                        </FormControl>
                    </Container>
                )
            })}
            <Container mt='1.5rem'>
                <PrimaryButton type='submit'>Submit</PrimaryButton>
            </Container>
        </Box>
    )
}
