import { Box, BoxProps } from '@chakra-ui/layout'
import React, { FunctionComponent } from 'react'
import { BackgroundPrimary800, BorderRadius } from '../../config/colors'

export const Container: FunctionComponent<BoxProps> = props => {
    return (
        <Box
            background={BackgroundPrimary800}
            padding='1.5rem'
            borderRadius={BorderRadius}
            {...props}
        />
    )
}
