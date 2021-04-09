package com.example.backend.entities;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(name = "name")
    @NotNull
    private String name;

    @Column(name = "email", unique = true)
    @NotNull
    private String email;

    @Column(name = "password")
    @NotNull
    private String password;

    @OneToMany(targetEntity = Survey.class, fetch = FetchType.LAZY, mappedBy = "owner")
    private Set<Survey> surveys;

    public User() {
    }

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Survey> getSurveys() {
        return surveys;
    }

    public void setSurveys(Set<Survey> surveys) {
        this.surveys = surveys;
    }
}
