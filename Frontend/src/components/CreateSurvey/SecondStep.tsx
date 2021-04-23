import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import { ChangeEventHandler, FormEventHandler, FunctionComponent } from 'react'
import { Question } from '../../pages/CreateSurvey'
import { Actions } from './Actions'
import { AddQuestion } from './AddQuestion'
import { CreateQuestionForm } from './CreateQuestionForm'

interface Props {
    step: number
    questions: Question[]
    inputRef: React.RefObject<HTMLInputElement>
    questionRef: React.RefObject<HTMLDivElement>
    onAddQuestion: () => void
    removeQuestionHandlerGenerator: (id: string) => () => void
    addAnswerHandlerGenerator: (id: string) => () => void
    questionChangeHandlerGenerator: (id: string) => ChangeEventHandler
    isRequiredChangeHandlerGenerator: (id: string) => () => void
    isMultipleChangeHandlerGenerator: (id: string) => () => void
    removeAnswerHandlerGenerator: (id: string) => (index: number) => () => void
    onStepBack: () => void
    onSubmit: FormEventHandler<HTMLDivElement> &
        FormEventHandler<HTMLFormElement>
    answerChangeHandlerGenerator: (
        id: string
    ) => (index: number) => ChangeEventHandler
}

export const SecondStep: FunctionComponent<Props> = props => {
    const {
        step,
        questions,
        inputRef,
        questionRef,
        onSubmit,
        onStepBack,
        onAddQuestion,
        addAnswerHandlerGenerator,
        answerChangeHandlerGenerator,
        removeAnswerHandlerGenerator,
        removeQuestionHandlerGenerator,
        questionChangeHandlerGenerator,
        isMultipleChangeHandlerGenerator,
        isRequiredChangeHandlerGenerator
    } = props

    if (step !== 2) {
        return null
    }

    return (
        <Box as='form' onSubmit={onSubmit}>
            {questions.map((question: Question, index: number) => {
                const { id } = question

                return (
                    <CreateQuestionForm
                        key={question.id}
                        ref={questionRef}
                        index={index + 1}
                        question={question}
                        inputRef={inputRef}
                        onRemove={removeQuestionHandlerGenerator(id)}
                        onAddAnswer={addAnswerHandlerGenerator(id)}
                        onQuestionChange={questionChangeHandlerGenerator(id)}
                        onAnswerChange={answerChangeHandlerGenerator(id)}
                        onAnswerRemove={removeAnswerHandlerGenerator(id)}
                        onIsRequiredChange={isRequiredChangeHandlerGenerator(
                            id
                        )}
                        onIsMultipleChange={isMultipleChangeHandlerGenerator(
                            id
                        )}
                    />
                )
            })}
            <AddQuestion onAddQuestion={onAddQuestion} />
            <Actions onStepBack={onStepBack} />
        </Box>
    )
}
