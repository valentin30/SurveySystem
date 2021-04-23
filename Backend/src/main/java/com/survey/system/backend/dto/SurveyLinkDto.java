package com.survey.system.backend.dto;

import java.util.UUID;

public class SurveyLinkDto {
    private long id;
    private String title;
    private String subtitle;
    private UUID publicKey;

    public SurveyLinkDto(long id, String title, String subtitle, UUID publicKey) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.publicKey = publicKey;
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
}
