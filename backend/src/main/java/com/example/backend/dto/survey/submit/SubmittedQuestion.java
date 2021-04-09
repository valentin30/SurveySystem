package com.example.backend.dto.survey.submit;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

public class SubmittedQuestion {
    private long id;

    private long answerId;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getAnswerId() {
        return answerId;
    }

    public void setAnswerId(long answerId) {
        this.answerId = answerId;
    }
}
