package com.example.backend.dto.survey.submit;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import java.util.Set;

public class SubmitSurveyRequest {
    @NotEmpty
    Set<@Valid SubmittedQuestion> questions;

    public Set<SubmittedQuestion> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<SubmittedQuestion> questions) {
        this.questions = questions;
    }
}
