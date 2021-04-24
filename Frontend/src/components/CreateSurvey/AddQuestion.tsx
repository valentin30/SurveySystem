import { FunctionComponent } from 'react'
import { Container } from '../Box/Container'
import { PrimaryButton } from '../Ui/Button/PrimaryButton'

interface Props {
    onAddQuestion: () => void
}

export const AddQuestion: FunctionComponent<Props> = props => {
    return (
        <Container mb='1.5rem'>
            <PrimaryButton mr='1.5rem' onClick={props.onAddQuestion}>
                Add Question
            </PrimaryButton>
        </Container>
    )
}
