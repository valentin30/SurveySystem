package com.survey.system.backend.entities;

import javax.persistence.*;
import java.util.Set;


@Entity
@Table(name = "question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "is_required", nullable = false)
    private boolean isRequired;

    @Column(name = "is_multiple", nullable = false)
    private boolean isMultiple;

    @ManyToOne(optional = false)
    @JoinColumn(name = "survey_id", nullable = false)
    private Survey survey;

    @OneToMany( mappedBy = "question")
    private Set<Answer> answers;

    public Question() {
    }

    public Question(String content, boolean isRequired, boolean isMultiple, Survey survey) {
        this.content = content;
        this.isRequired = isRequired;
        this.isMultiple = isMultiple;
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

    public boolean isRequired() {
        return isRequired;
    }

    public void setRequired(boolean required) {
        isRequired = required;
    }

    public boolean isMultiple() {
        return isMultiple;
    }

    public void setMultiple(boolean multiple) {
        isMultiple = multiple;
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
