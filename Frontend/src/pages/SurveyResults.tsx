import { FunctionComponent } from 'react'
import { Loader } from '../components/Ui/Loader'
import { useGetSurveyResults } from '../hooks/HTTP/useGetSurveyResults'

export type PathVariable = 'privateKey' | 'id'

interface Props {
    pathVariableName: PathVariable
}

export const SurveyResults: FunctionComponent<Props> = props => {
    const surveyResults = useGetSurveyResults(props.pathVariableName)

    if (!surveyResults) {
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

    return (
        <>
            <pre>{JSON.stringify(surveyResults, null, 2)}</pre>
        </>
    )
}
