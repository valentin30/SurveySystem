import { Heading } from '@chakra-ui/layout'
import React, { FunctionComponent } from 'react'
import { PrimaryTextColor } from '../../config/colors'

interface Props {}

export const CardHeading: FunctionComponent<Props> = props => {
    return (
        <Heading
            color={PrimaryTextColor}
            fontSize='1.4rem'
            marginBottom='0.75rem'>
            {props.children}
        </Heading>
    )
}
