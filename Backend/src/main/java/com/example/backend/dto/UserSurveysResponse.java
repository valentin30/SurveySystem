package com.example.backend.dto;

import java.util.Set;

public class UserSurveysResponse {
    private Set<UserSurveyDto> surveys;

    public UserSurveysResponse(Set<UserSurveyDto> surveys) {
        this.surveys = surveys;
    }

    public Set<UserSurveyDto> getSurveys() {
        return surveys;
    }

    public void setSurveys(Set<UserSurveyDto> surveys) {
        this.surveys = surveys;
    }
}
