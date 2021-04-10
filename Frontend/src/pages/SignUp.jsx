import { Button } from '@chakra-ui/button'
import { Text } from '@chakra-ui/layout'
import { Box, Heading } from '@chakra-ui/layout'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { TextField } from '../components/Ui/Input/TextField'
import {
    BackgroundPrimary800,
    BorderRadius,
    PrimaryButtonColor,
    PrimaryTextColor,
    SecondaryTextColor
} from '../config/colors'

export const SignUp = () => {
    return (
        <Box
            maxWidth='lg'
            margin='auto'
            position='fixed'
            top='50%'
            transform='translateY(-50%)'
            left='0'
            right='0'
            background={BackgroundPrimary800}
            padding='2rem'
            borderRadius={BorderRadius}
            as='form'>
            <Heading color={PrimaryTextColor}>Sign Up</Heading>
            <TextField type='text' placeholder='Name' marginTop='2rem' />
            <TextField type='email' marginTop='1.75rem' placeholder='Email' />
            <TextField
                type='password'
                marginTop='1.75rem'
                placeholder='Password'
            />
            <Button
                size='lg'
                marginTop='1.75rem'
                colorScheme={PrimaryButtonColor}
                isFullWidth>
                Sign Up
            </Button>
            <Text
                color={SecondaryTextColor}
                marginTop='1.75rem'
                textAlign='center'>
                Already have an account?{' '}
                <Button
                    colorScheme={PrimaryButtonColor}
                    variant='link'
                    as={Link}
                    to='/sign-in'>
                    Sign in.
                </Button>
            </Text>
        </Box>
    )
}
