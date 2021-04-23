import { Center, CenterProps } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { FunctionComponent } from 'react'
import { PrimaryButtonColor } from '../../config/colors'

export const Loader: FunctionComponent<CenterProps> = props => {
    return (
        <Center paddingTop='2rem' {...props}>
            <Spinner thickness='2px' color={PrimaryButtonColor} size='xl' />
        </Center>
    )
}
