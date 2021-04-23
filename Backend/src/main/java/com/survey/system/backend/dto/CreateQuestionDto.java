package com.survey.system.backend.dto;

import jdk.jfr.BooleanFlag;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

public class CreateQuestionDto {
    @NotEmpty
    private String question;

    @NotEmpty
    private List<@Valid String> answers;

    private boolean isRequired;

    private boolean isMultiple;

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<String> getAnswers() {
        return answers;
    }

    public void setAnswers(List<String> answers) {
        this.answers = answers;
    }

    public boolean getIsRequired() {
        return isRequired;
    }

    public void setISRequired(boolean required) {
        isRequired = required;
    }

    public boolean getIsMultiple() {
        return isMultiple;
    }

    public void setIsMultiple(boolean multiple) {
        isMultiple = multiple;
    }
}
