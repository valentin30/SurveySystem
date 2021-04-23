import { Checkbox, CheckboxGroup } from '@chakra-ui/checkbox'
import { Stack, Text } from '@chakra-ui/layout'
import { FunctionComponent } from 'react'
import { PrimaryButtonColor, SecondaryTextColor } from '../../config/colors'
import { Answer } from '../../dto/get/Answer'

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
                        <Text
                            mt='0.1rem'
                            fontWeight='semibold'
                            fontSize='md'
                            color={SecondaryTextColor}>
                            {answer.content}
                        </Text>
                    </Checkbox>
                ))}
            </Stack>
        </CheckboxGroup>
    )
}
