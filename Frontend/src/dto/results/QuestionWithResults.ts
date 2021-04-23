import { Question } from '../get/Question'
import { AnswerWithResults } from './AnswerWithResults'

export interface QuestionWithResults extends Question {
    answers: AnswerWithResults[]
}
