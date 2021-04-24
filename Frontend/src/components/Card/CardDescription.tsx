import { Text } from '@chakra-ui/layout'
import React, { FunctionComponent } from 'react'
import { SecondaryTextColor } from '../../config/colors'

interface Props {}

export const CardDescription: FunctionComponent<Props> = props => {
    return (
        <Text
            color={SecondaryTextColor}
            fontSize='0.875rem'
            marginBottom='1.25rem'>
            {props.children}
        </Text>
    )
}
