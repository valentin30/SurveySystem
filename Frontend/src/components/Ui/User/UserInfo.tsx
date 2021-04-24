import { Avatar } from '@chakra-ui/avatar'
import { Flex, Heading } from '@chakra-ui/layout'
import { useMediaQuery } from '@chakra-ui/media-query'
import { FunctionComponent } from 'react'
import { PrimaryTextColor } from '../../../config/colors'
import { useGetUserInfo } from '../../../hooks/HTTP/useGetUserInfo'
import { Container } from '../../Box/Container'

interface Props {}

export const UserInfo: FunctionComponent<Props> = props => {
    const { loading, userData } = useGetUserInfo()
    const [match] = useMediaQuery('(max-width: 1275px')

    if (loading || !userData) {
        return null
    }

    if (match) {
        return null
    }

    return (
        <Container
            position='absolute'
            left='100%'
            maxWidth='250px'
            width='100%'
            ml='2rem'
            mt='2rem'
            padding='1.25rem'>
            <Flex>
                <Avatar name={userData.name} />
                <Heading
                    isTruncated
                    color={PrimaryTextColor}
                    ml='0.5rem'
                    mt='0.3rem'
                    fontSize='md'>
                    {userData.name}
                </Heading>
            </Flex>
        </Container>
    )
}
