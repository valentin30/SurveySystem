package com.survey.system.backend.dto;

import java.util.UUID;

public class CreateSurveyResponseNoAuth {
    private UUID publicKey;
    private UUID privateKey;

    public CreateSurveyResponseNoAuth(UUID publicKey, UUID privateKey) {
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
