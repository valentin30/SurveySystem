import { Avatar } from '@chakra-ui/avatar'
import { Box, Flex, Heading } from '@chakra-ui/layout'
import { useMediaQuery } from '@chakra-ui/media-query'
import { FunctionComponent } from 'react'
import {
    BackgroundPrimary700,
    BorderRadius,
    PrimaryTextColor
} from '../../../config/colors'
import { UserDataResponse } from '../../../dto/user/UserDataResponse'
import { useGetUserInfo } from '../../../hooks/HTTP/useGetUserInfo'

interface Props {}

export const UserInfo: FunctionComponent<Props> = props => {
    const userData: UserDataResponse | null = useGetUserInfo()
    const [match] = useMediaQuery('(max-width: 1275px')

    if (!userData) {
        return null
    }

    if (match) {
        return null
    }

    return (
        <Box
            position='absolute'
            backgroundColor={BackgroundPrimary700}
            borderRadius={BorderRadius}
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
        </Box>
    )
}
