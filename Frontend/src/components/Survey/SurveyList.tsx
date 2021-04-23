import { Flex } from '@chakra-ui/layout'
import { FunctionComponent } from 'react'
import { SurveyLink } from '../../dto/get/SurveyLink'
import { Loader } from '../Ui/Loader'
import { SurveyCard } from './SurveyCard'

interface Props {
    surveys: SurveyLink[] | null
}

export const SurveyList: FunctionComponent<Props> = ({ surveys }) => {
    if (!surveys) {
        return <Loader />
    }

    return (
        <Flex
            minHeight='full'
            direction='column'
            paddingBottom='2rem'
            gridGap='1rem'>
            {surveys?.map((survey: SurveyLink) => (
                <SurveyCard key={survey.id} survey={survey} />
            ))}
        </Flex>
    )
}
