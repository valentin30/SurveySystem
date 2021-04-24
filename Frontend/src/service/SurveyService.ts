import { CreateSurveyRequest } from '../dto/create/CreateSurveyRequest'
import {
    CreateSurveyResponse,
    CreateSurveyResponseNoAuth
} from '../dto/create/CreateSurveyResponse'
import { Answer } from '../dto/get/Answer'
import { Question } from '../dto/get/Question'
import { SurveyResponse } from '../dto/get/SurveyResponse'
import { SurveysResponse } from '../dto/get/SurveysResponse'
import { SurveyResultsPayload } from '../dto/results/SurveyResultsPayload'
import { SurveyResultsResponse } from '../dto/results/SurveyResultsResponse'
import { SubmitSurveyRequest } from '../dto/submit/SubmitSurveyRequest'
import { UserSurveysResponse } from '../dto/user/UserSurveysResponse'
import {
    CLOSE,
    CREATE_SURVEY,
    CREATE_SURVEY_NO_AUTH,
    NO_AUTH,
    RESULTS,
    SUBMIT,
    SURVEY_URL,
    USER_SURVEYS
} from '../utils/routes'

export class SurveyService {
    static async getSurveys(): Promise<SurveysResponse> {
        const response: Response = await fetch(SURVEY_URL)

        if (response.status === 400) {
            throw new Error('Plaese make sure you provide all the information!')
        }

        if (!response.ok) {
            throw new Error(String(response.status))
        }

        const data: SurveysResponse = await response.json()

        return data
    }

    static async getSurveyByPublicKey(
        publicKey: string
    ): Promise<SurveyResponse> {
        const response: Response = await fetch(SURVEY_URL + '/' + publicKey)

        if (response.status === 400) {
            throw new Error('Plaese make sure you provide all the information!')
        }

        if (response.status === 404) {
            throw new Error('This survey does not exists!')
        }

        if (response.status === 423) {
            throw new Error("This survey was closed by it's owner!")
        }

        if (!response.ok) {
            throw new Error(String(response.status))
        }

        const survey: SurveyResponse = await response.json()

        survey.questions = survey.questions.sort(
            (a: Question, b: Question) => a.id - b.id
        )
        survey.questions.forEach((question: Question) =>
            question.answers.sort((a: Answer, b: Answer) => a.id - b.id)
        )

        return survey
    }

    static async getSurveyResults({
        id,
        token
    }: SurveyResultsPayload): Promise<SurveyResultsResponse> {
        const response: Response = await fetch(
            SURVEY_URL + '/' + id + RESULTS,
            {
                method: 'GET',
                headers: {
                    Authorization: token
                }
            }
        )

        if (response.status === 400) {
            throw new Error('Plaese make sure you provide all the information!')
        }

        if (response.status === 404) {
            throw new Error('This survey does not exists!')
        }

        if (response.status === 403) {
            throw new Error('This survey does not belong to you!')
        }

        if (!response.ok) {
            throw new Error(String(response.status))
        }

        const surveyResult: SurveyResultsResponse = await response.json()

        surveyResult.questions = surveyResult.questions.sort(
            (a: Question, b: Question) => a.id - b.id
        )
        surveyResult.questions.forEach((question: Question) =>
            question.answers.sort((a: Answer, b: Answer) => a.id - b.id)
        )

        return surveyResult
    }

    static async getSurveyResultsNoAuth(
        privateKey: string
    ): Promise<SurveyResultsResponse> {
        const response: Response = await fetch(
            SURVEY_URL + '/' + privateKey + RESULTS + NO_AUTH
        )

        if (response.status === 400) {
            throw new Error('Plaese make sure you provide all the information!')
        }

        if (response.status === 404) {
            throw new Error('This survey does not exists!')
        }

        if (!response.ok) {
            throw new Error(String(response.status))
        }

        const surveyResult: SurveyResultsResponse = await response.json()

        return surveyResult
    }

    static async getUserSurveys(token: string): Promise<UserSurveysResponse> {
        const response: Response = await fetch(USER_SURVEYS, {
            method: 'GET',
            headers: {
                Authorization: token
            }
        })

        if (response.status === 400) {
            throw new Error('Plaese make sure you provide all the information!')
        }

        if (response.status === 404) {
            throw new Error('You have no surveys!')
        }

        if (response.status === 403) {
            throw new Error('This survey does not belong to you!')
        }

        if (!response.ok) {
            throw new Error(String(response.status))
        }

        const data: UserSurveysResponse = await response.json()

        return data
    }

    static async createSurvey(
        token: string,
        body: CreateSurveyRequest
    ): Promise<CreateSurveyResponse> {
        const response: Response = await fetch(CREATE_SURVEY, {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        if (response.status === 400) {
            throw new Error('Plaese make sure you provide all the information!')
        }

        if (response.status === 403) {
            throw new Error('This survey does not belong to you!')
        }

        if (!response.ok) {
            throw new Error(String(response.status))
        }

        const data: CreateSurveyResponse = await response.json()

        return data
    }

    static async createSurveyNoAuth(
        body: CreateSurveyRequest
    ): Promise<CreateSurveyResponseNoAuth> {
        const response: Response = await fetch(CREATE_SURVEY_NO_AUTH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        if (response.status === 400) {
            throw new Error('Plaese make sure you provide all the information!')
        }

        if (!response.ok) {
            throw new Error(String(response.status))
        }

        const data: CreateSurveyResponseNoAuth = await response.json()

        return data
    }

    static async submitSurvey(
        publicKey: string,
        body: SubmitSurveyRequest
    ): Promise<boolean> {
        const response: Response = await fetch(
            SURVEY_URL + '/' + publicKey + SUBMIT,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        )

        if (response.status === 404) {
            throw new Error('This survey does not exists!')
        }

        if (response.status === 403) {
            throw new Error("This survey was closed by it's owner!")
        }

        if (!response.ok) {
            throw new Error(String(response.status))
        }

        return true
    }

    static async modifySurvey(id: number, token: string): Promise<boolean> {
        const response: Response = await fetch(SURVEY_URL + '/' + id + CLOSE, {
            method: 'PUT',
            headers: {
                Authorization: token
            }
        })

        if (response.status === 404) {
            throw new Error('This survey does not exists!')
        }

        if (response.status === 403) {
            throw new Error('This survey does not belong to you!')
        }

        if (!response.ok) {
            throw new Error(String(response.status))
        }

        return true
    }
}
