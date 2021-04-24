import { IconButton } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { CopyIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/layout'
import React, { FunctionComponent } from 'react'
import { PrimaryButtonColor, SecondaryTextColor } from '../../config/colors'
import { TextField } from '../Ui/Input/TextField'

interface Props {
    label: string
    link: string
    onCopy: () => void
}

export const Link: FunctionComponent<Props> = props => {
    return (
        <FormControl>
            <FormLabel color={SecondaryTextColor}>{props.label}</FormLabel>
            <Flex alignItems='center' position='relative'>
                <TextField value={props.link} isReadOnly placeholder='Link' />
                <IconButton
                    position='absolute'
                    aria-label='copy'
                    variant='solid'
                    colorScheme={PrimaryButtonColor}
                    top='0'
                    right='0'
                    height='100%'
                    width='3.5rem'
                    onClick={props.onCopy}>
                    <CopyIcon fontSize='1.3rem' />
                </IconButton>
            </Flex>
        </FormControl>
    )
}
