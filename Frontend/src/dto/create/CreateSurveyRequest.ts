import { CreateQuestion } from './CreateQuestion'

export interface CreateSurveyRequest {
    title: string
    subtitle: string
    questions: CreateQuestion[]
}
