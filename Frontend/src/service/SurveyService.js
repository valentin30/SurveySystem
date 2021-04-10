import { NO_AUTH, RESULTS, SURVEY_URL, USER_SURVEYS } from '../utils/routes'

export class SurveyService {
    static getSurveys() {
        return fetch(SURVEY_URL)
            .then(res => res.json())
            .then(data => data.surveys)
    }

    static getSurveyByPublicKey(publicKey) {
        return fetch(SURVEY_URL + '/' + publicKey).then(res => res.json())
    }

    static getSurveyResults({ id, token }) {
        return fetch(SURVEY_URL + '/' + id + RESULTS, {
            method: 'GET',
            headers: {
                Authorization: token
            }
        }).then(res => res.json())
    }

    static getSurveyResultsNoAuth(privateKey) {
        return fetch(
            SURVEY_URL + '/' + privateKey + RESULTS + NO_AUTH
        ).then(res => res.json())
    }

    static getUserSurveys(token) {
        return fetch(USER_SURVEYS, {
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
            .then(res => res.json())
            .then(data => data.surveys)
    }

    static createSurvey() {}

    static createSurveyNoAuth() {}

    static submitSurvey() {}

    static modifySurvey() {}
}
