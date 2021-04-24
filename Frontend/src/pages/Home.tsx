import { FunctionComponent } from 'react'
import { SurveyList } from '../components/List/SurveyList'
import { FloatingButton } from '../components/Ui/Button/FloatingButton'
import { Header } from '../components/Ui/Header'
import { useGetSurveys } from '../hooks/HTTP/useGetSurveys'

export const Home: FunctionComponent = () => {
    const { surveys, loading } = useGetSurveys()

    return (
        <>
            <Header heading='Available Surveys' />
            <SurveyList surveys={surveys} loading={loading} />
            <FloatingButton />
        </>
    )
}
