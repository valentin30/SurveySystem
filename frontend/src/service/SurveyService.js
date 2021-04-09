import { SURVEY_URL } from '../utils/routes'

export class SurveyService {
    static getSurveys() {
        return fetch(SURVEY_URL)
            .then(res => res.json())
            .then(data => data.surveys)
    }

    static getSurveyByPublicKey() {}

    static getSurveyResults() {}

    static getSurveyResultsNoAuth() {}

    static getUserSurveys() {}

    static createSurvey() {}

    static createSurveyNoAuth() {}

    static submitSurvey() {}

    static modifySurvey() {}
}
