import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import { Box } from '@chakra-ui/layout'
import { ChangeEvent, FormEvent, FunctionComponent } from 'react'
import {
    BackgroundPrimary800,
    BorderRadius,
    PrimaryTextColor
} from '../../config/colors'
import { PrimaryButton } from '../Ui/Button/PrimaryButton'
import { TextField } from '../Ui/Input/TextField'

interface Props {
    step: number
    title: string
    onTitleChange: (event: ChangeEvent<HTMLInputElement>) => void
    subtitle: string
    onSubtitleChange: (event: ChangeEvent<HTMLInputElement>) => void
    onNextStep: (event: FormEvent) => void
}

export const FirstStep: FunctionComponent<Props> = props => {
    if (props.step !== 1) {
        return null
    }

    return (
        <Box
            as='form'
            onSubmit={props.onNextStep}
            backgroundColor={BackgroundPrimary800}
            borderRadius={BorderRadius}
            mb='1.5rem'
            padding='1.5rem'>
            <FormControl isRequired>
                <FormLabel color={PrimaryTextColor}>Title</FormLabel>
                <TextField value={props.title} onChange={props.onTitleChange} />
                <FormHelperText>Choose a title for your survey</FormHelperText>
            </FormControl>
            <FormControl isRequired>
                <FormLabel mt='1.5rem' color={PrimaryTextColor}>
                    Subtitle
                </FormLabel>
                <TextField
                    value={props.subtitle}
                    onChange={props.onSubtitleChange}
                />
                <FormHelperText>
                    Choose a subtitle for your survey
                </FormHelperText>
            </FormControl>
            <PrimaryButton mt='1.5rem' type='submit'>
                Next
            </PrimaryButton>
        </Box>
    )
}
