import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { Box, Flex, Heading } from '@chakra-ui/layout'
import { useMediaQuery } from '@chakra-ui/media-query'
import { FunctionComponent, useCallback, useRef } from 'react'
import { useHistory } from 'react-router'
import { SurveyList } from '../components/Survey/SurveyList'
import { AlertDialog } from '../components/Ui/AlertDialog'
import { FloadingButton } from '../components/Ui/Button/FloatingButton'
import { PrimaryButton } from '../components/Ui/Button/PrimaryButton'
import { TextField } from '../components/Ui/Input/TextField'
import { UserInfo } from '../components/Ui/User/UserInfo'
import { BackgroundPrimary900, PrimaryTextColor } from '../config/colors'
import { useGetSurveys } from '../hooks/HTTP/useGetSurveys'
import { useAuth } from '../hooks/useAuth'
import { QUERY, TO } from '../utils/query'
import { CREATE, SIGN_IN, SURVEY } from '../utils/routes'

export const Home: FunctionComponent = () => {
    const { token } = useAuth()
    const history = useHistory()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const [match] = useMediaQuery('(max-width: 460px')

    const { surveys } = useGetSurveys()

    const toCreateSurveyHandler = useCallback(() => {
        if (!token) {
            onOpen()
            return
        }

        history.push(SURVEY + CREATE)
    }, [onOpen, token, history])

    return (
        <>
            <Flex
                zIndex='sticky'
                position='sticky'
                top='0'
                direction='column'
                background={BackgroundPrimary900}>
                <Box position='relative'>
                    <UserInfo />
                </Box>
                <Flex
                    justifyContent='space-between'
                    alignItems='center'
                    padding={match ? '1rem 0' : '2rem 0'}>
                    <Heading
                        color={PrimaryTextColor}
                        {...(match ? { size: 'md' } : null)}>
                        Available Surveys
                    </Heading>
                    <PrimaryButton
                        minWidth='fit-content'
                        {...(match ? { ml: '0.5rem' } : null)}
                        onClick={toCreateSurveyHandler}>
                        Create Survey
                    </PrimaryButton>
                </Flex>
            </Flex>

            <SurveyList surveys={surveys} />
            <FloadingButton />

            <AlertDialog
                buttonRef={buttonRef}
                isOpen={isOpen}
                onClose={onClose}
                header='Not logged in!'
                message='You can still create surveys though'>
                <Button
                    ref={buttonRef}
                    onClick={() =>
                        history.push(SIGN_IN + QUERY + TO + SURVEY + CREATE)
                    }
                    mr='1.5rem'
                    colorScheme={PrimaryTextColor}>
                    Sign In
                </Button>
                <PrimaryButton onClick={() => history.push(SURVEY + CREATE)}>
                    Continue
                </PrimaryButton>
            </AlertDialog>
        </>
    )
}
