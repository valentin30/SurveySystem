import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import { FunctionComponent } from 'react'
import {
    BackgroundPrimary800,
    BorderRadius,
    PrimaryTextColor
} from '../../config/colors'
import { PrimaryButton } from '../Ui/Button/PrimaryButton'

interface Props {
    onStepBack: () => void
}

export const Actions: FunctionComponent<Props> = props => {
    return (
        <Box
            backgroundColor={BackgroundPrimary800}
            borderRadius={BorderRadius}
            padding='1.5rem'>
            <Button
                mr='1.5rem'
                onClick={props.onStepBack}
                colorScheme={PrimaryTextColor}>
                Back
            </Button>
            <PrimaryButton type='submit'>Publish Survey</PrimaryButton>
        </Box>
    )
}
