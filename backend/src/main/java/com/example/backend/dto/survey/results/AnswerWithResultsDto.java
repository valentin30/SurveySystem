package com.example.backend.dto.survey.results;

public class AnswerWithResultsDto {
    private final long id;
    private final String content;
    private final long selectionCount;

    public AnswerWithResultsDto(long id, String content, long selectionCount) {
        this.id = id;
        this.content = content;
        this.selectionCount = selectionCount;
    }

    public long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public long getSelectionCount() {
        return selectionCount;
    }
}
