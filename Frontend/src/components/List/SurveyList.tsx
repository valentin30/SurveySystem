import { FunctionComponent } from 'react'
import { SurveyLink } from '../../dto/get/SurveyLink'
import { Loader } from '../Ui/Loader'
import { List } from './List'
import { SurveyCard } from '../Card/SurveyCard'

interface Props {
    surveys: SurveyLink[] | null
    loading: boolean
}

export const SurveyList: FunctionComponent<Props> = ({ surveys, loading }) => {
    if (loading) {
        return <Loader />
    }

    if (!surveys) {
        return null
    }

    return (
        <List>
            {surveys.map((survey: SurveyLink) => (
                <SurveyCard key={survey.id} survey={survey} />
            ))}
        </List>
    )
}
