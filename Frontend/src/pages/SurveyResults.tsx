import { Checkbox } from '@chakra-ui/checkbox'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Box, Heading, Stack, Text } from '@chakra-ui/layout'
import { Radio } from '@chakra-ui/radio'
import { Switch } from '@chakra-ui/switch'
import { FunctionComponent, useContext } from 'react'
import { AnswerText } from '../components/Answers/AnswerText'
import { Container } from '../components/Box/Container'
import { PrivateLink } from '../components/Links/PrivateLink'
import { PublicLink } from '../components/Links/PublicLink'
import { SurveyTag } from '../components/Survey/SurveyTag'
import { Loader } from '../components/Ui/Loader'
import {
    PrimaryButtonColor,
    PrimaryTextColor,
    SecondaryTextColor
} from '../config/colors'
import { AuthContext, IAuthContext } from '../context/AuthContext'
import { AnswerWithResults } from '../dto/results/AnswerWithResults'
import { QuestionWithResults } from '../dto/results/QuestionWithResults'
import { useGetSurveyResults } from '../hooks/HTTP/useGetSurveyResults'

export type PathVariable = 'privateKey' | 'id'

interface Props {
    pathVariableName: PathVariable
}

export const SurveyResults: FunctionComponent<Props> = props => {
    const { loading, survey, toggleSurveyHandler } = useGetSurveyResults(
        props.pathVariableName
    )
    const { token } = useContext<IAuthContext>(AuthContext)

    if (loading) {
        return (
            <Loader
                position='fixed'
                top='30%'
                left='0'
                right='0'
                margin='auto'
            />
        )
    }

    if (!survey) {
        return null
    }

    return (
        <Box pt='3rem' pb='3rem'>
            <Container
                display='flex'
                justifyContent='space-between'
                alignItems='flex-end'>
                <Box>
                    <SurveyTag size='md'>
                        {survey.participants} people took place in your survey.
                    </SurveyTag>
                    <Heading color={PrimaryTextColor} size='xl'>
                        {survey.title}
                    </Heading>
                    <Text mt='0.75rem' color={SecondaryTextColor}>
                        {survey.subtitle}
                    </Text>
                </Box>
                {token ? (
                    <Stack direction='row' mt='1.5rem' alignItems='center'>
                        <Switch
                            size='lg'
                            isChecked={survey.closed}
                            onChange={toggleSurveyHandler}
                            colorScheme={PrimaryButtonColor}
                        />
                        <Text color={PrimaryTextColor} fontWeight='semibold'>
                            Close Survey
                        </Text>
                    </Stack>
                ) : null}
            </Container>

            <Container mt='1.5rem'>
                <PublicLink path={survey.publicKey} />
            </Container>

            {!token ? (
                <Container mt='1.5rem'>
                    <PrivateLink path={survey.privateKey} />
                </Container>
            ) : null}
            {survey.questions.map(
                (question: QuestionWithResults, index: number) => {
                    return (
                        <Container key={question.id} mt='1.5rem'>
                            <FormControl isRequired={question.isRequired}>
                                <FormLabel display='flex'>
                                    <Heading
                                        color={PrimaryTextColor}
                                        size='md'
                                        mb='1rem'>
                                        {index + 1}. {question.content}
                                    </Heading>
                                </FormLabel>
                                <Stack ml='0.5rem'>
                                    {question.answers.map(
                                        (answer: AnswerWithResults) => {
                                            const content = (
                                                <AnswerText>
                                                    {answer.content}
                                                    <SurveyTag size='sm'>
                                                        {getAnswerPercent(
                                                            survey.participants,
                                                            answer.selectionCount
                                                        )}
                                                    </SurveyTag>
                                                </AnswerText>
                                            )

                                            const inputProps = {
                                                key: answer.id,
                                                size: 'lg',
                                                borderColor: SecondaryTextColor,
                                                isChecked: false,
                                                colorScheme: PrimaryButtonColor,
                                                children: content
                                            }

                                            return question.isMultiple ? (
                                                <Checkbox {...inputProps} />
                                            ) : (
                                                <Radio
                                                    cursor='pointer'
                                                    {...inputProps}
                                                />
                                            )
                                        }
                                    )}
                                </Stack>
                            </FormControl>
                        </Container>
                    )
                }
            )}
        </Box>
    )
}

const getAnswerPercent = (p: number, v: number): string => {
    if (!p) {
        return '0% of people'
    }

    return `${((v / p) * 100).toFixed(0)}% of people`
}
