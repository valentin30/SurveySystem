import { Button } from '@chakra-ui/button'
import { Box, Heading, Text } from '@chakra-ui/layout'
import { Link } from 'react-router-dom'
import {
    BackgroundPrimary700,
    BackgroundPrimary800,
    BorderRadius,
    PrimaryButtonColor,
    PrimaryTextColor,
    SecondaryTextColor
} from '../../config/colors'
import { SURVEY } from '../../utils/routes'

export const SurveyCard = props => (
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
            {props.title}
        </Heading>
        <Text
            color={SecondaryTextColor}
            fontSize='0.875rem'
            marginBottom='1.25rem'>
            {props.subtitle}
        </Text>
        <Button
            colorScheme={PrimaryButtonColor}
            as={Link}
            to={SURVEY + '/' + props.publicKey}>
            Take Survey
        </Button>
    </Box>
)
