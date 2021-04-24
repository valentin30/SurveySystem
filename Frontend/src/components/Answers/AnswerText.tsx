import { Text } from '@chakra-ui/layout'
import { FunctionComponent } from 'react'
import { SecondaryTextColor } from '../../config/colors'

export const AnswerText: FunctionComponent = props => {
    return (
        <Text
            cursor='pointer'
            mt='0.1rem'
            fontWeight='semibold'
            display='flex'
            alignItems='center'
            fontSize='md'
            color={SecondaryTextColor}>
            {props.children}
        </Text>
    )
}
