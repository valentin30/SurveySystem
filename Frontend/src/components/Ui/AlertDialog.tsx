import {
    AlertDialog as Dialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay
} from '@chakra-ui/modal'
import { FunctionComponent } from 'react'
import {
    BackgroundPrimary800,
    PrimaryTextColor,
    SecondaryTextColor
} from '../../config/colors'

interface Props {
    header: string
    message: string
    isOpen: boolean
    buttonRef: React.RefObject<HTMLButtonElement>
    onClose: () => void
}

export const AlertDialog: FunctionComponent<Props> = props => {
    return (
        <Dialog
            isOpen={props.isOpen}
            leastDestructiveRef={props.buttonRef}
            onClose={props.onClose}>
            <AlertDialogOverlay>
                <AlertDialogContent backgroundColor={BackgroundPrimary800}>
                    <AlertDialogHeader
                        fontSize='3xl'
                        mb='-0.75rem'
                        color={PrimaryTextColor}
                        fontWeight='bold'>
                        {props.header}
                    </AlertDialogHeader>
                    <AlertDialogBody color={SecondaryTextColor}>
                        {props.message}
                    </AlertDialogBody>
                    <AlertDialogFooter>{props.children}</AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </Dialog>
    )
}
