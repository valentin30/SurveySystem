import { SurveyResponse } from '../get/SurveyResponse'
import { QuestionWithResults } from './QuestionWithResults'

export interface SurveyResultsResponse extends SurveyResponse {
    privateKey: string
    closed: boolean
    participants: number
    questions: QuestionWithResults[]
}
