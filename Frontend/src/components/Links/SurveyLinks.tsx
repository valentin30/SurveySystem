import { Heading } from '@chakra-ui/layout'
import { FunctionComponent } from 'react'
import { PrimaryTextColor } from '../../config/colors'
import { useAuth } from '../../hooks/useAuth'
import { Container } from '../Box/Container'
import { PrivateLink } from './PrivateLink'
import { PublicLink } from './PublicLink'

interface Props {
    keys: [string, string]
}

export const SurveyLinks: FunctionComponent<Props> = props => {
    const { token } = useAuth()

    return (
        <Container p='1.75rem'>
            <Heading color={PrimaryTextColor} mb='1.5rem'>
                Survey Links
            </Heading>
            <PublicLink path={props.keys[0]} />
            {!token ? <PrivateLink path={props.keys[1]} /> : null}
        </Container>
    )
}
