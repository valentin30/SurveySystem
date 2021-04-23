import { Answer } from '../get/Answer'

export interface AnswerWithResults extends Answer {
    selectionCount: number
}
