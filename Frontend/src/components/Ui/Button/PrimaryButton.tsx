import { Button, ButtonProps } from '@chakra-ui/button'
import React, { FunctionComponent } from 'react'
import { LinkProps } from 'react-router-dom'
import { PrimaryButtonColor } from '../../../config/colors'

export const PrimaryButton: FunctionComponent<ButtonProps> = props => {
    return <Button colorScheme={PrimaryButtonColor} {...props} />
}
