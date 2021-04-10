package com.example.backend.dto;

import java.util.Set;
import java.util.UUID;

public class SurveyResultsResponse {
    private final long id;
    private final String title;
    private final String subtitle;
    private final UUID publicKey;
    private final UUID privateKey;
    private final boolean isClosed;
    private final long participants;
    private final Set<QuestionWithResultsDto> questions;

    public SurveyResultsResponse(long id, String title, String subtitle, UUID publicKey, UUID privateKey, boolean isClosed, long participants, Set<QuestionWithResultsDto> questions) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.isClosed = isClosed;
        this.participants = participants;
        this.questions = questions;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public UUID getPublicKey() {
        return publicKey;
    }

    public UUID getPrivateKey() {
        return privateKey;
    }

    public boolean isClosed() {
        return isClosed;
    }

    public long getParticipants() {
        return participants;
    }

    public Set<QuestionWithResultsDto> getQuestions() {
        return questions;
    }
}
