package com.example.backend.dto;

public class UserSurveyDto {
    private  long id;
    private  String title;
    private  String subtitle;

    public UserSurveyDto(long id, String title, String subtitle) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
    }

    public void setId(long id) {
        this.id = id;
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

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }
}
