package com.example.backend.controllers;

import com.example.backend.dto.AuthenticateRequest;
import com.example.backend.dto.CreateUserRequest;
import com.example.backend.dto.TokenResponse;
import com.example.backend.services.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/sign-in")
    public TokenResponse signIn(@Valid @RequestBody AuthenticateRequest authenticateRequest) {
        return authService.signIn(authenticateRequest);
    }

    @PostMapping("/sign-up")
    public TokenResponse signUp(@Valid @RequestBody CreateUserRequest createUserRequest) {
        return authService.signUp(createUserRequest);
    }
}
