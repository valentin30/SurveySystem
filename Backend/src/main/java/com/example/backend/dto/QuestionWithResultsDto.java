package com.example.backend.dto;

import java.util.Set;

public class QuestionWithResultsDto {
    private final long id;
    private final String content;
    private final Set<AnswerWithResultsDto> answers;

    public QuestionWithResultsDto(long id, String content, Set<AnswerWithResultsDto> answers) {
        this.id = id;
        this.content = content;
        this.answers = answers;
    }

    public long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public Set<AnswerWithResultsDto> getAnswers() {
        return answers;
    }
}
