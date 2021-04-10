import { Box, Center } from '@chakra-ui/layout'
import { BackgroundPrimary900 } from '../../config/colors'

export const Layout = props => {
    return (
        <Box minHeight='full' background={BackgroundPrimary900}>
            <Box
                margin='auto'
                position='relative'
                maxWidth='5xl'
                width='full'
                height='full'
                padding='0 1rem'>
                {props.children}
            </Box>
        </Box>
    )
}
