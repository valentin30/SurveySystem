package com.example.backend.dto.survey.create;

import java.util.UUID;

public class CreateSurveyResponse {
    private UUID publicKey;
    private UUID privateKey;

    public CreateSurveyResponse(UUID publicKey, UUID privateKey) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }

    public UUID getPublicKey() {
        return publicKey;
    }

    public void setPublicKey(UUID publicKey) {
        this.publicKey = publicKey;
    }

    public UUID getPrivateKey() {
        return privateKey;
    }

    public void setPrivateKey(UUID privateKey) {
        this.privateKey = privateKey;
    }
}
