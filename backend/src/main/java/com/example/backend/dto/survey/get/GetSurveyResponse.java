package com.example.backend.dto.survey.get;

import java.util.Set;
import java.util.UUID;

public class GetSurveyResponse {
    private long id;
    private String title;
    private String subtitle;
    private UUID publicKey;
    private Set<QuestionDto> questions;

    public GetSurveyResponse(long id, String title, String subtitle, UUID publicKey, Set<QuestionDto> questions) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.publicKey = publicKey;
        this.questions = questions;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

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

    public UUID getPublicKey() {
        return publicKey;
    }

    public void setPublicKey(UUID publicKey) {
        this.publicKey = publicKey;
    }

    public Set<QuestionDto> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<QuestionDto> questions) {
        this.questions = questions;
    }
}
