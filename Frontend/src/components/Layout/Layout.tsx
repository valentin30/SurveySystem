import { EditIcon } from '@chakra-ui/icons'
import { Box, Heading } from '@chakra-ui/layout'
import { useMediaQuery } from '@chakra-ui/media-query'
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { BackgroundPrimary900, PrimaryTextColor } from '../../config/colors'

export const Layout: FunctionComponent = props => {
    const [tablet] = useMediaQuery('(max-width: 1375px')
    const [mobile] = useMediaQuery('(max-width: 850px')

    return (
        <Box minHeight='full' background={BackgroundPrimary900}>
            {!mobile ? (
                <Box
                    position='fixed'
                    top='1.5rem'
                    left='1.5rem'
                    display='flex'
                    as={Link}
                    to='/'
                    alignItems='center'>
                    <EditIcon
                        fontSize='3rem'
                        mr='0.5rem'
                        color={PrimaryTextColor}
                    />
                    {!tablet ? (
                        <Heading mt='0.2rem' color={PrimaryTextColor}>
                            SurveySystem
                        </Heading>
                    ) : null}
                </Box>
            ) : null}
            <Box
                margin='auto'
                position='relative'
                maxWidth='2xl'
                width='full'
                height='full'
                padding='0 1rem'>
                {props.children}
            </Box>
        </Box>
    )
}
