import { Button } from '@chakra-ui/button'
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import { CloseIcon } from '@chakra-ui/icons'
import { Box, Flex, Stack, Text } from '@chakra-ui/layout'
import { Switch } from '@chakra-ui/switch'
import {
    ChangeEventHandler,
    forwardRef,
    ForwardRefExoticComponent
} from 'react'
import {
    BackgroundPrimary800,
    BorderRadius,
    PrimaryButtonColor,
    PrimaryTextColor,
    SecondaryTextColor
} from '../../config/colors'
import { Question } from '../../pages/CreateSurvey'
import { TextField } from '../Ui/Input/TextField'

interface Props {
    index: number
    question: Question
    inputRef: React.RefObject<HTMLInputElement>
    onRemove: () => void
    onQuestionChange: ChangeEventHandler
    onIsRequiredChange: () => void
    onIsMultipleChange: () => void
    onAddAnswer: () => void
    onAnswerChange: (index: number) => ChangeEventHandler
    onAnswerRemove: (index: number) => () => void
}

export const CreateQuestionForm: ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLDivElement>
> = forwardRef((props, ref) => {
    return (
        <>
            <Box
                ref={ref}
                backgroundColor={BackgroundPrimary800}
                borderRadius={BorderRadius}
                mb='1.5rem'
                padding='1.5rem'>
                <FormControl isRequired>
                    <Flex alignItems='center' justifyContent='space-between'>
                        <FormLabel color={PrimaryTextColor}>
                            {props.index}. Question
                        </FormLabel>
                        <Button
                            p='0.1rem'
                            mb='0.1rem'
                            colorScheme={PrimaryTextColor}
                            onClick={props.onRemove}>
                            <CloseIcon fontSize='0.875rem' />
                        </Button>
                    </Flex>
                    <TextField
                        ref={props.inputRef}
                        value={props.question.question}
                        onChange={props.onQuestionChange}
                    />
                    <FormHelperText>Choose your question.</FormHelperText>
                    <Stack direction='row' mt='1.5rem' alignItems='center'>
                        <Switch
                            isChecked={props.question.isRequired}
                            onChange={props.onIsRequiredChange}
                            size='lg'
                            colorScheme={PrimaryButtonColor}
                        />
                        <Text color={PrimaryTextColor} fontWeight='medium'>
                            Required
                        </Text>
                    </Stack>
                    <Stack direction='row' mt='1.5rem' alignItems='center'>
                        <Switch
                            isChecked={props.question.isMultiple}
                            onChange={props.onIsMultipleChange}
                            size='lg'
                            colorScheme={PrimaryButtonColor}
                        />
                        <Text color={PrimaryTextColor} fontWeight='medium'>
                            Multiple choises
                        </Text>
                    </Stack>
                </FormControl>
            </Box>
            <Box
                backgroundColor={BackgroundPrimary800}
                borderRadius={BorderRadius}
                mb='1.5rem'
                padding='1.5rem'>
                <FormControl isRequired>
                    <FormLabel mb='1rem' color={PrimaryTextColor}>
                        {props.index}. Answers
                    </FormLabel>
                    {props.question.answers.map(
                        (answer: string, index: number) => (
                            <Flex key={index} mt={index ? '1.5rem' : ''}>
                                <TextField
                                    value={answer}
                                    onChange={props.onAnswerChange(index)}
                                />
                                <Button
                                    mt='0.7rem'
                                    ml='-2.75rem'
                                    size='sm'
                                    colorScheme={SecondaryTextColor}
                                    zIndex='10'
                                    onClick={props.onAnswerRemove(index)}>
                                    <CloseIcon color='gray.500' />
                                </Button>
                            </Flex>
                        )
                    )}
                    <FormHelperText>
                        Provide at least two answers.
                    </FormHelperText>
                    <Button
                        onClick={props.onAddAnswer}
                        mt='1.5rem'
                        colorScheme={PrimaryButtonColor}>
                        Add Answer
                    </Button>
                </FormControl>
            </Box>
        </>
    )
})
