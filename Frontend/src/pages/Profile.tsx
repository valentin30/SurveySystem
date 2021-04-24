import { FunctionComponent } from 'react'
import { UserSurveyList } from '../components/List/UserSurveyList'
import { FloatingButton } from '../components/Ui/Button/FloatingButton'
import { Header } from '../components/Ui/Header'
import { useGetUserSurveys } from '../hooks/HTTP/useGetUserSurveys'

interface Props {}

export const Profile: FunctionComponent<Props> = props => {
    const { surveys, loading } = useGetUserSurveys()

    return (
        <>
            <Header heading='Your Surveys' />
            <UserSurveyList surveys={surveys} loading={loading} />
            <FloatingButton />
        </>
    )
}
