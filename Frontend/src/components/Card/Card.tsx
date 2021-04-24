import React, { FunctionComponent } from 'react'
import { BackgroundPrimary700 } from '../../config/colors'
import { Container } from '../Box/Container'

interface Props {}

export const Card: FunctionComponent<Props> = props => {
    return (
        <Container
            padding='1.25rem'
            transition='300ms'
            _hover={{ background: BackgroundPrimary700 }}>
            {props.children}
        </Container>
    )
}
