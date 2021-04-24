import { Button, ButtonProps } from '@chakra-ui/button'
import React, { FunctionComponent } from 'react'
import { PrimaryButtonColor } from '../../../config/colors'

export const PrimaryButton: FunctionComponent<ButtonProps> = props => {
    return <Button colorScheme={PrimaryButtonColor} {...props} />
}
