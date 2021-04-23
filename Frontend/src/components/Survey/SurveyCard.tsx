import { Button } from '@chakra-ui/button'
import { Box, Heading, Text } from '@chakra-ui/layout'
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import {
    BackgroundPrimary700,
    BackgroundPrimary800,
    BorderRadius,
    PrimaryButtonColor,
    PrimaryTextColor,
    SecondaryTextColor
} from '../../config/colors'
import { SurveyLink } from '../../dto/get/SurveyLink'
import { SURVEY } from '../../utils/routes'
import { PrimaryButtonLink } from '../Ui/Button/PrimaryButtonLink'

interface Props {
    survey: SurveyLink
}

export const SurveyCard: FunctionComponent<Props> = ({ survey }) => (
    <Box
        backgroundColor={BackgroundPrimary800}
        borderRadius={BorderRadius}
        padding='1.25rem'
        transition='300ms'
        _hover={{ background: BackgroundPrimary700 }}>
        <Heading
            color={PrimaryTextColor}
            fontSize='1.4rem'
            marginBottom='0.75rem'>
            {survey.title}
        </Heading>
        <Text
            color={SecondaryTextColor}
            fontSize='0.875rem'
            marginBottom='1.25rem'>
            {survey.subtitle}
        </Text>
        <PrimaryButtonLink size='sm' to={SURVEY + '/' + survey.publicKey}>
            Take Survey
        </PrimaryButtonLink>
    </Box>
)
