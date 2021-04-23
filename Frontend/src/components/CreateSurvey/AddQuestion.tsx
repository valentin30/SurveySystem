import { Box } from '@chakra-ui/layout'
import { FunctionComponent } from 'react'
import { BackgroundPrimary800, BorderRadius } from '../../config/colors'
import { PrimaryButton } from '../Ui/Button/PrimaryButton'

interface Props {
    onAddQuestion: () => void
}

export const AddQuestion: FunctionComponent<Props> = props => {
    return (
        <Box
            backgroundColor={BackgroundPrimary800}
            borderRadius={BorderRadius}
            padding='1.5rem'
            mb='1.5rem'>
            <PrimaryButton mr='1.5rem' onClick={props.onAddQuestion}>
                Add Question
            </PrimaryButton>
        </Box>
    )
}
