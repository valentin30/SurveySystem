import { Question } from './Question'

export interface SurveyResponse {
    id: number
    title: string
    subtitle: string
    publicKey: string
    questions: Question[]
}
