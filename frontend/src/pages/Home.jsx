import { Button } from '@chakra-ui/button'
import { SearchIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { Flex, Heading } from '@chakra-ui/layout'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { SurveyCard } from '../components/Survey/SurveyCard'
import {
    BackgroundPrimary800,
    PrimaryButtonColor,
    PrimaryTextColor
} from '../config/colors'
import { SurveyService } from '../service/SurveyService'

export const Home = () => {
    const [surveys, setSurveys] = useState([])
    const [search, setSearch] = useState('')

    const filteredSurveys = useMemo(() => {
        return surveys
            .filter(survey =>
                search
                    .trim()
                    .toLowerCase()
                    .split(' ')
                    .some(s => survey.title?.trim().toLowerCase().includes(s))
            )
            .slice(0, 4)
    }, [surveys, search])

    const onChangeHandler = useCallback(event => {
        setSearch(event.target.value)
    }, [])

    useEffect(() => {
        SurveyService.getSurveys().then(setSurveys)
    }, [])

    return (
        <>
            <InputGroup variant='unstyled' margin='1rem 0 2rem 0 '>
                <InputLeftElement
                    pointerEvents='none'
                    padding='0.8rem'
                    children={
                        <SearchIcon
                            fontSize='1.2rem'
                            color={PrimaryTextColor}
                        />
                    }
                />
                <Input
                    background={BackgroundPrimary800}
                    padding='0.7rem 1.2rem 0.6rem 2.5rem'
                    placeholder='Search for survey'
                    value={search}
                    onChange={onChangeHandler}
                    color={PrimaryTextColor}
                />
            </InputGroup>

            <Flex justifyContent='space-between' marginBottom='2rem'>
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
            <Flex maxHeight='full' direction='column' gridGap='1rem'>
                {filteredSurveys.map(survey => (
                    <SurveyCard
                        key={survey.id}
                        publicKey={survey.publicKey}
                        title={survey.title}
                        subtitle={survey.subtitle}
                    />
                ))}
                {!filteredSurveys.length && (
                    <Heading
                        color={PrimaryTextColor}
                        textAlign='center'
                        marginTop='2rem'>
                        No Surveys Found
                    </Heading>
                )}
            </Flex>
        </>
    )
}
