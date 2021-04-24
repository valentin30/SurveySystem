import { Stack } from '@chakra-ui/layout'
import { Radio, RadioGroup } from '@chakra-ui/radio'
import { FunctionComponent } from 'react'
import { PrimaryButtonColor, SecondaryTextColor } from '../../config/colors'
import { Answer } from '../../dto/get/Answer'
import { AnswerText } from './AnswerText'

interface Props {
    answers: Answer[]
    value: number
    onChange: (value: string) => void
}

export const RadioAnswerGroup: FunctionComponent<Props> = props => {
    return (
        <RadioGroup
            colorScheme={PrimaryButtonColor}
            ml='0.5rem'
            value={props.value}
            onChange={props.onChange}>
            <Stack>
                {props.answers.map((answer: Answer) => (
                    <Radio
                        cursor='pointer'
                        size='lg'
                        borderColor={SecondaryTextColor}
                        value={answer.id}
                        key={answer.id}>
                        <AnswerText>{answer.content}</AnswerText>
                    </Radio>
                ))}
            </Stack>
        </RadioGroup>
    )
}
