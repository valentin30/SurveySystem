package com.example.backend.entities;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "survey")
public class Survey {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(name = "title")
    private String title;

    @Column(name = "subtitle")
    private String subtitle;

    @Column(name = "public_key", unique = true)
    private UUID publicKey;

    @Column(name = "private_key", unique = true)
    private UUID privateKey;

    @Column(name = "is_closed")
    private boolean isClosed = false;

    @Column(name = "participants")
    private long participants = 0;

    @ManyToOne()
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany( mappedBy = "survey")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Question> questions;

    public Survey() {
    }

    public Survey(String title, String subtitle, UUID publicKey, UUID privateKey) {
        this.title = title;
        this.subtitle = subtitle;
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }

    public Survey(String title, String subtitle, UUID publicKey, UUID privateKey, User user) {
        this.title = title;
        this.subtitle = subtitle;
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.owner = user;
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

    public UUID getPrivateKey() {
        return privateKey;
    }

    public void setPrivateKey(UUID privateKey) {
        this.privateKey = privateKey;
    }

    public boolean isClosed() {
        return isClosed;
    }

    public void setClosed(boolean closed) {
        isClosed = closed;
    }

    public long getParticipants() {
        return participants;
    }

    public void setParticipants(long participants) {
        this.participants = participants;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Set<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }
}
