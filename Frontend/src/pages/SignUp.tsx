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
import { SIGN_UP } from '../utils/routes'

export const SignUp: FunctionComponent = () => {
    const {
        submitHandler,
        input: { name, email, password },
        search
    } = useAuthFormControll(SIGN_UP)

    return (
        <Box
            onSubmit={submitHandler}
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
            as='form'>
            <Heading color={PrimaryTextColor}>Sign Up</Heading>
            <TextField
                type='text'
                {...name}
                placeholder='Name'
                marginTop='2rem'
            />
            <TextField
                type='email'
                {...email}
                marginTop='1.75rem'
                placeholder='Email'
            />
            <TextField
                type='password'
                {...password}
                marginTop='1.75rem'
                placeholder='Password'
            />
            <Button
                size='lg'
                type='submit'
                marginTop='1.75rem'
                colorScheme={PrimaryButtonColor}
                isFullWidth>
                Sign Up
            </Button>
            <Text
                color={SecondaryTextColor}
                marginTop='1.75rem'
                fontSize='sm'
                textAlign='center'>
                Already have an account?{' '}
                <Button
                    colorScheme={PrimaryButtonColor}
                    variant='link'
                    as={Link}
                    fontSize='sm'
                    to={`/sign-in${search}`}>
                    Sign in.
                </Button>
            </Text>
        </Box>
    )
}
