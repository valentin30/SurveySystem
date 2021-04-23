package com.survey.system.backend.dto;

import java.util.UUID;

public class CreateSurveyResponse {
    private UUID publicKey;
    private long id;

    public CreateSurveyResponse(UUID publicKey, long id) {
        this.publicKey = publicKey;
        this.id = id;
    }

    public UUID getPublicKey() {
        return publicKey;
    }

    public void setPublicKey(UUID publicKey) {
        this.publicKey = publicKey;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
