import { Answer } from './Answer'

export interface Question {
    id: number
    content: string
    answers: Answer[]
    isRequired: boolean
    isMultiple: boolean
}
