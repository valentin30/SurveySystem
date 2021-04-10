import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import { Center } from '@chakra-ui/layout'
import { Flex, Heading } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { SurveyCard } from '../components/Survey/SurveyCard'
import { FloadingButton } from '../components/Ui/Button/FloatingButton'
import {
    BackgroundPrimary700,
    BackgroundPrimary900,
    PrimaryButtonColor,
    PrimaryTextColor
} from '../config/colors'
import { SurveyService } from '../service/SurveyService'

export const Home = () => {
    const [surveys, setSurveys] = useState()

    useEffect(() => {
        SurveyService.getSurveys().then(setSurveys)
    }, [])

    return (
        <>
            <Flex
                background={BackgroundPrimary900}
                position='sticky'
                justifyContent='space-between'
                top='0'
                zIndex='sticky'
                padding='2rem 0'>
                <Heading color={PrimaryTextColor} size='xl'>
                    Available Surveys
                </Heading>
                <Button
                    colorScheme={PrimaryButtonColor}
                    as={Link}
                    to='/survey/create'>
                    Create Survey
                </Button>
            </Flex>
            <Flex
                minHeight='full'
                direction='column'
                paddingBottom='2rem'
                gridGap='1rem'>
                {surveys?.map(survey => (
                    <SurveyCard
                        key={survey.id}
                        publicKey={survey.publicKey}
                        title={survey.title}
                        subtitle={survey.subtitle}
                    />
                ))}
                {!surveys && (
                    <Center marginTop='2rem'>
                        <Spinner
                            thickness='3px'
                            color={BackgroundPrimary700}
                            size='xl'
                        />
                    </Center>
                )}
            </Flex>
            <FloadingButton />
        </>
    )
}
