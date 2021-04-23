import { Button } from '@chakra-ui/button'
import { Box, Heading, Text } from '@chakra-ui/layout'
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { TextField } from '../components/Ui/Input/TextField'
import {
    BackgroundPrimary800,
    BorderRadius,
    PrimaryButtonColor,
    PrimaryTextColor,
    SecondaryTextColor
} from '../config/colors'
import { useAuthFormControll } from '../hooks/useAuthFormControll'
import { SIGN_IN } from '../utils/routes'

export const SignIn: FunctionComponent = () => {
    const {
        submitHandler,
        input: { email, password },
        search
    } = useAuthFormControll(SIGN_IN)

    return (
        <Box
            maxWidth='lg'
            margin='auto'
            position='fixed'
            top='40%'
            transform='translateY(-50%)'
            left='0'
            right='0'
            background={BackgroundPrimary800}
            padding='2rem'
            borderRadius={BorderRadius}
            onSubmit={submitHandler}
            as='form'>
            <Heading color={PrimaryTextColor}>Sign In</Heading>
            <TextField
                type='email'
                {...email}
                marginTop='2rem'
                placeholder='Email'
                isRequired
            />
            <TextField
                type='password'
                {...password}
                marginTop='1.75rem'
                placeholder='Password'
                isRequired
            />
            <Button
                size='lg'
                marginTop='1.75rem'
                colorScheme={PrimaryButtonColor}
                type='submit'
                isFullWidth>
                Sign In
            </Button>
            <Text
                color={SecondaryTextColor}
                marginTop='1.75rem'
                fontSize='sm'
                textAlign='center'>
                Don't have an account?{' '}
                <Button
                    colorScheme={PrimaryButtonColor}
                    variant='link'
                    fontSize='sm'
                    as={Link}
                    to={`/sign-up${search}`}>
                    Sign up.
                </Button>
            </Text>
        </Box>
    )
}
