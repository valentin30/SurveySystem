import { Button, IconButton } from '@chakra-ui/button'
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import { useClipboard } from '@chakra-ui/hooks'
import { CopyIcon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import { Box, Flex, Heading } from '@chakra-ui/layout'
import { FunctionComponent } from 'react'
import { Redirect } from 'react-router'
import {
    BackgroundPrimary800,
    BorderRadius,
    PrimaryButtonColor,
    PrimaryTextColor,
    SecondaryTextColor
} from '../../config/colors'
import { useAuth } from '../../hooks/useAuth'
import { NO_AUTH, RESULTS, SURVEY } from '../../utils/routes'
import { TextField } from '../Ui/Input/TextField'

interface Props {
    keys: [string, string]
}

export const SurveyLinks: FunctionComponent<Props> = props => {
    const { token } = useAuth()

    const { value: publicLink, onCopy: onCopyPublic } = useClipboard(
        window.location.origin + SURVEY + '/' + props.keys[0]
    )

    const privatePath: string =
        SURVEY + '/' + props.keys[1] + RESULTS + (!token ? NO_AUTH : '')

    const { value: privateLink, onCopy: onCopyPrivate } = useClipboard(
        window.location.origin + privatePath
    )

    if (token) {
        return <Redirect to={privatePath} />
    }

    return (
        <Box
            backgroundColor={BackgroundPrimary800}
            borderRadius={BorderRadius}
            p='1.75rem'>
            <Heading color={PrimaryTextColor} mb='1.5rem'>
                Survey Links
            </Heading>
            <FormControl>
                <FormLabel color={SecondaryTextColor}>Public Link</FormLabel>
                <Flex alignItems='center' position='relative'>
                    <TextField
                        value={publicLink}
                        isReadOnly
                        placeholder='Link'
                    />
                    <IconButton
                        position='absolute'
                        aria-label='copy'
                        variant='solid'
                        colorScheme={PrimaryButtonColor}
                        top='0'
                        right='0'
                        height='100%'
                        width='3.5rem'
                        onClick={onCopyPublic}>
                        <CopyIcon fontSize='1.3rem' />
                    </IconButton>
                </Flex>
            </FormControl>
            <FormControl mt='1.5rem'>
                <FormLabel color={SecondaryTextColor}>Private Link</FormLabel>
                <Flex alignItems='center' position='relative'>
                    <TextField
                        value={privateLink}
                        isReadOnly
                        placeholder='Link'
                    />
                    <IconButton
                        position='absolute'
                        aria-label='copy'
                        variant='solid'
                        colorScheme={PrimaryButtonColor}
                        top='0'
                        right='0'
                        height='100%'
                        width='3.5rem'
                        onClick={onCopyPrivate}>
                        <CopyIcon fontSize='1.3rem' />
                    </IconButton>
                </Flex>
            </FormControl>
        </Box>
    )
}
