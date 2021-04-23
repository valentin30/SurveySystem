import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Box, Heading, Text } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'
import { FormEvent, FunctionComponent, useCallback } from 'react'
import { useParams } from 'react-router'
import { CheckBoxAnswerGroup } from '../components/Answers/CheckBoxAnswerGroup'
import { RadioAnswerGroup } from '../components/Answers/RadioAnswerGroup'
import { PrimaryButton } from '../components/Ui/Button/PrimaryButton'
import { Loader } from '../components/Ui/Loader'
import {
    BackgroundPrimary800,
    BorderRadius,
    PrimaryTextColor,
    SecondaryTextColor
} from '../config/colors'
import { Question } from '../dto/get/Question'
import { SubmittedQuestion } from '../dto/submit/SubmittedQuestion'
import { useGetSurvey } from '../hooks/HTTP/useGetSurvey'
import { SurveyService } from '../service/SurveyService'

interface Params {
    publicKey: string
}

export const Survey: FunctionComponent = () => {
    const { publicKey } = useParams<Params>()

    const { survey, answers, onCheckboxChange, onRadioChange } = useGetSurvey(
        publicKey
    )

    const toast = useToast()

    const submitHandler = useCallback(
        async (event: FormEvent) => {
            event.preventDefault()
            try {
                const success: boolean = await SurveyService.submitSurvey(
                    publicKey,
                    { questions: answers ?? [] }
                )
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
        [answers, publicKey, toast]
    )

    if (!survey) {
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

    return (
        <Box pt='3rem' pb='3rem' as='form' onSubmit={submitHandler}>
            <Box
                background={BackgroundPrimary800}
                padding='1.5rem'
                borderRadius={BorderRadius}>
                <Heading color={PrimaryTextColor} size='xl'>
                    {survey.title}
                </Heading>
                <Text mt='0.5rem' color={SecondaryTextColor}>
                    {survey.subtitle}
                </Text>
            </Box>
            {survey.questions.map((question: Question) => {
                const answer: SubmittedQuestion | undefined = answers?.find(
                    a => a.id === question.id
                )

                if (!answer) {
                    return null
                }

                return (
                    <Box
                        key={question.id}
                        mt='1.5rem'
                        background={BackgroundPrimary800}
                        padding='1.5rem'
                        borderRadius={BorderRadius}>
                        <FormControl isRequired={question.isRequired}>
                            <FormLabel display='flex'>
                                <Heading
                                    color={PrimaryTextColor}
                                    size='md'
                                    mb='1rem'>
                                    {question.content}
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
                    </Box>
                )
            })}
            <Box
                background={BackgroundPrimary800}
                padding='1.5rem'
                mt='1.5rem'
                borderRadius={BorderRadius}>
                <PrimaryButton type='submit'>Submit</PrimaryButton>
            </Box>
        </Box>
    )
}
