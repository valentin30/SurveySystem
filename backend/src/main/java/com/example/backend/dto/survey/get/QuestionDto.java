package com.example.backend.dto.survey.get;

import com.example.backend.dto.survey.get.AnswerDto;

import java.util.Set;

public class QuestionDto {
    private long id;
    private String content;
    private Set<AnswerDto> answers;

    public QuestionDto(long id, String content, Set<AnswerDto> answers) {
        this.id = id;
        this.content = content;
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

    public Set<AnswerDto> getAnswers() {
        return answers;
    }

    public void setAnswers(Set<AnswerDto> answers) {
        this.answers = answers;
    }
}
