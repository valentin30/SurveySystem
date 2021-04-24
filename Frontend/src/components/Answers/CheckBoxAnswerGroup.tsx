import { Checkbox, CheckboxGroup } from '@chakra-ui/checkbox'
import { Stack } from '@chakra-ui/layout'
import { FunctionComponent } from 'react'
import { PrimaryButtonColor, SecondaryTextColor } from '../../config/colors'
import { Answer } from '../../dto/get/Answer'
import { AnswerText } from './AnswerText'

interface Props {
    answers: Answer[]
    values: number[]
    onChange: (id: number) => void
}

export const CheckBoxAnswerGroup: FunctionComponent<Props> = props => {
    return (
        <CheckboxGroup colorScheme={PrimaryButtonColor} value={props.values}>
            <Stack ml='0.5rem'>
                {props.answers.map((answer: Answer) => (
                    <Checkbox
                        key={answer.id}
                        size='lg'
                        borderColor={SecondaryTextColor}
                        value={answer.id}
                        onChange={() => {
                            props.onChange(answer.id)
                        }}
                        colorScheme={PrimaryButtonColor}>
                        <AnswerText>{answer.content}</AnswerText>
                    </Checkbox>
                ))}
            </Stack>
        </CheckboxGroup>
    )
}
