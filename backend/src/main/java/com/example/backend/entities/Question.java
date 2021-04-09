package com.example.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.List;
import java.util.Set;


@Entity
@Table(name = "question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(name = "content", nullable = false)
    private String content;

    @ManyToOne(optional = false)
    @JoinColumn(name = "survey_id", nullable = false)
    private Survey survey;

    @OneToMany( mappedBy = "question")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Answer> answers;

    public Question() {
    }

    public Question(String content) {
        this.content = content;
    }

    public Question(String content, Survey survey) {
        this.content = content;
        this.survey = survey;
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

    public Survey getSurvey() {
        return survey;
    }

    public void setSurvey(Survey survey) {
        this.survey = survey;
    }

    public Set<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(Set<Answer> answers) {
        this.answers = answers;
    }
}
