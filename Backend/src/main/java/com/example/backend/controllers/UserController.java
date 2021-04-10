package com.example.backend.controllers;

import com.example.backend.dto.UserDataResponse;
import com.example.backend.entities.User;
import com.example.backend.services.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public UserDataResponse getUserInformation(@AuthenticationPrincipal User user) {
        return new UserDataResponse(user.getId(), user.getName(), user.getEmail());
    }
}
