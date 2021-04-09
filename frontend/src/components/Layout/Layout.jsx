import { Box, Center } from '@chakra-ui/layout'
import { BackgroundPrimary900 } from '../../config/colors'
import { FloadingButton } from '../Ui/Button/FloatingButton'

export const Layout = props => {
    return (
        <Box minHeight='full' background={BackgroundPrimary900}>
            <Center>
                <Box maxWidth='5xl' width='full' padding='1rem'>
                    {props.children}
                </Box>
            </Center>
            <FloadingButton />
        </Box>
    )
}
