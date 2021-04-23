package com.survey.system.backend.dto;

import java.util.Set;

public class QuestionDto {
    private long id;
    private String content;
    private boolean isMultiple;
    private boolean isRequired;
    private Set<AnswerDto> answers;

    public QuestionDto(long id, String content, boolean isMultiple, boolean isRequired, Set<AnswerDto> answers) {
        this.id = id;
        this.content = content;
        this.isMultiple = isMultiple;
        this.isRequired = isRequired;
        this.answers = answers;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean getIsMultiple() {
        return isMultiple;
    }

    public void setIsMultiple(boolean multiple) {
        isMultiple = multiple;
    }

    public boolean getIsRequired() {
        return isRequired;
    }

    public void setIsRequired(boolean required) {
        isRequired = required;
    }

    public Set<AnswerDto> getAnswers() {
        return answers;
    }

    public void setAnswers(Set<AnswerDto> answers) {
        this.answers = answers;
    }
}
