package com.example.backend.dto;

public class UserDataResponse {
    private final long id;

    private final String name;

    private final String email;

    public UserDataResponse(long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}
