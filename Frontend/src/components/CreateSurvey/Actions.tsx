import { Button } from '@chakra-ui/button'
import { FunctionComponent } from 'react'
import { PrimaryTextColor } from '../../config/colors'
import { Container } from '../Box/Container'
import { PrimaryButton } from '../Ui/Button/PrimaryButton'

interface Props {
    onStepBack: () => void
}

export const Actions: FunctionComponent<Props> = props => {
    return (
        <Container>
            <Button
                mr='1.5rem'
                onClick={props.onStepBack}
                colorScheme={PrimaryTextColor}>
                Back
            </Button>
            <PrimaryButton type='submit'>Publish Survey</PrimaryButton>
        </Container>
    )
}
