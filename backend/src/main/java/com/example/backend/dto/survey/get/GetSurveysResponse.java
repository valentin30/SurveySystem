package com.example.backend.dto.survey.get;

import java.util.Set;

public class GetSurveysResponse {
    Set<SurveyLinkDto> surveys;

    public GetSurveysResponse(Set<SurveyLinkDto> surveys) {
        this.surveys = surveys;
    }

    public Set<SurveyLinkDto> getSurveys() {
        return surveys;
    }

    public void setSurveys(Set<SurveyLinkDto> surveys) {
        this.surveys = surveys;
    }
}
