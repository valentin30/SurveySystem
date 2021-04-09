package com.example.backend.dto.survey.create;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import java.util.List;

public class CreateSurveyRequest {
    @NotEmpty
    private String title;

    @NotEmpty
    private String subtitle;

    @NotEmpty
    private List<@Valid CreateQuestionDto> questions;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public List<CreateQuestionDto> getQuestions() {
        return questions;
    }

    public void setQuestions(List<CreateQuestionDto> questions) {
        this.questions = questions;
    }
}
