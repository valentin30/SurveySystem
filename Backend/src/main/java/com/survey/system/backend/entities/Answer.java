package com.survey.system.backend.entities;

import javax.persistence.*;

@Entity
@Table(name = "answer")
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "content")
    private String content;

    @Column(name = "selection_count")
    private long selectionCount = 0;

    @ManyToOne(optional = false)
    @JoinColumn(name = "question_id")
    private Question question;

    public Answer() {
    }

    public Answer(String content) {
        this.content = content;
    }

    public Answer(String content, Question question) {
        this.content = content;
        this.question = question;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public long getSelectionCount() {
        return selectionCount;
    }

    public void setSelectionCount(long selectionCount) {
        this.selectionCount = selectionCount;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }
}
