import { FunctionComponent } from 'react'
import { UserSurvey } from '../../dto/user/UserSurvey'
import { UserSurveyCard } from '../Card/UserSurveyCard'
import { Loader } from '../Ui/Loader'
import { List } from './List'

interface Props {
    surveys: UserSurvey[] | null
    loading: boolean
}

export const UserSurveyList: FunctionComponent<Props> = ({
    surveys,
    loading
}) => {
    if (loading) {
        return <Loader />
    }

    if (!surveys) {
        return null
    }

    return (
        <List>
            {surveys?.map((survey: UserSurvey) => (
                <UserSurveyCard key={survey.id} survey={survey} />
            ))}
        </List>
    )
}
