package com.survey.system.backend.dto;

import java.util.ArrayList;

public class SubmittedQuestion {
    private long id;

    private ArrayList<Long> answerIds;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public ArrayList<Long> getAnswerIds() {
        return answerIds;
    }

    public void setAnswerIds(ArrayList<Long> answerIds) {
        this.answerIds = answerIds;
    }
}
