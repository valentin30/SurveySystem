import { Button } from '@chakra-ui/button'
import { Box, Heading } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'
import React, {
    FormEvent,
    FunctionComponent,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react'
import { FirstStep } from '../components/CreateSurvey/FirstStep'
import { SecondStep } from '../components/CreateSurvey/SecondStep'
import { SurveyLinks } from '../components/Links/SurveyLinks'
import { AlertDialog } from '../components/Ui/AlertDialog'
import { PrimaryButton } from '../components/Ui/Button/PrimaryButton'
import { Loader } from '../components/Ui/Loader'
import { PrimaryTextColor } from '../config/colors'
import { CreateQuestion } from '../dto/create/CreateQuestion'
import { CreateSurveyRequest } from '../dto/create/CreateSurveyRequest'
import {
    CreateSurveyResponse,
    CreateSurveyResponseNoAuth
} from '../dto/create/CreateSurveyResponse'
import { useAuth } from '../hooks/useAuth'
import { useCreateSurveyQuestions } from '../hooks/useCreateSurveyQuestions'
import { useInput } from '../hooks/useInput'
import { useStepper } from '../hooks/useStepper'
import { SurveyService } from '../service/SurveyService'

interface Props {}

export interface Question extends CreateQuestion {
    id: string
}

export const CreateSurvey: FunctionComponent<Props> = props => {
    const toast = useToast()

    //stepper

    const { step, nextStepHandler, prevStepHandler } = useStepper()

    //title & subtitle

    const [title, titleChangeHandler] = useInput()
    const [subtitle, subtitleChangeHandler] = useInput()

    //Questions and functions

    const {
        questions,
        addQuestionHandler,
        addAnswerHandlerGenerator,
        answerChangeHandlerGenerator,
        removeAnswerHandlerGenerator,
        questionChangeHandlerGenerator,
        removeQuestionHandlerGenerator,
        isMultipleChangeHandlerGenerator,
        isRequiredChangeHandlerGenerator
    } = useCreateSurveyQuestions()

    //modal

    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const closeHandler = useCallback(() => {
        setIsOpen(false)
    }, [])

    //Fetch

    const [loading, setLoading] = useState<boolean>(false)
    const [keys, setKeys] = useState<[string, string] | null>(null)
    const { token } = useAuth()

    const createSurveyHandler = useCallback(async () => {
        setLoading(true)
        setIsOpen(false)

        const body: CreateSurveyRequest = {
            title,
            subtitle,
            questions: questions.map(({ id, ...rest }: Question) => rest)
        }

        try {
            const data:
                | CreateSurveyResponseNoAuth
                | CreateSurveyResponse = token
                ? await SurveyService.createSurvey(token, body)
                : await SurveyService.createSurveyNoAuth(body)

            setKeys(Object.values(data) as [string, string])
            setLoading(false)
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
    }, [title, subtitle, questions, token, toast])

    const submitHandler = useCallback((event: FormEvent) => {
        event.preventDefault()
        setIsOpen(true)
    }, [])

    // Refs

    const inputRef = useRef<HTMLInputElement>(null)
    const questionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
        questionRef.current?.scrollIntoView({
            behavior: 'smooth'
        })
    }, [questions.length])

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

    if (keys) {
        return (
            <Box pt='6rem' pb='2rem'>
                <SurveyLinks keys={keys} />
            </Box>
        )
    }

    return (
        <Box pt='3rem' pb='3rem'>
            <Heading color={PrimaryTextColor} mb='1.5rem'>
                Create Survey
            </Heading>
            <FirstStep
                step={step}
                title={title}
                subtitle={subtitle}
                onTitleChange={titleChangeHandler}
                onSubtitleChange={subtitleChangeHandler}
                onNextStep={nextStepHandler}
            />
            <SecondStep
                step={step}
                questions={questions}
                inputRef={inputRef}
                questionRef={questionRef}
                onSubmit={submitHandler}
                onStepBack={prevStepHandler}
                onAddQuestion={addQuestionHandler}
                addAnswerHandlerGenerator={addAnswerHandlerGenerator}
                removeAnswerHandlerGenerator={removeAnswerHandlerGenerator}
                answerChangeHandlerGenerator={answerChangeHandlerGenerator}
                questionChangeHandlerGenerator={questionChangeHandlerGenerator}
                removeQuestionHandlerGenerator={removeQuestionHandlerGenerator}
                isMultipleChangeHandlerGenerator={
                    isMultipleChangeHandlerGenerator
                }
                isRequiredChangeHandlerGenerator={
                    isRequiredChangeHandlerGenerator
                }
            />
            <AlertDialog
                buttonRef={buttonRef}
                isOpen={isOpen}
                onClose={closeHandler}
                header='Publish Survey'
                message="Are you sure? You can't undo this action afterwards.">
                <Button
                    ref={buttonRef}
                    onClick={closeHandler}
                    mr='1.5rem'
                    colorScheme={PrimaryTextColor}>
                    Cancel
                </Button>
                <PrimaryButton onClick={createSurveyHandler}>
                    Publish
                </PrimaryButton>
            </AlertDialog>
        </Box>
    )
}
