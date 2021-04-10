package com.example.backend.controllers;

import com.example.backend.dto.*;
import com.example.backend.entities.User;
import com.example.backend.services.SurveyService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;

@RestController
@RequestMapping("/survey")
public class SurveyController {
    private final SurveyService surveyService;

    public SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @GetMapping
    public GetSurveysResponse getSurveys(){
        return surveyService.getSurveys();
    }

    @GetMapping("/{publicKey}")
    public GetSurveyResponse getSurveyForAttendance(@PathVariable UUID publicKey) {
        return surveyService.getSurveyForAttendance(publicKey);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}/results")
    public SurveyResultsResponse getSurveyResults(@PathVariable long id, @AuthenticationPrincipal User user) {
        return surveyService.getSurveyResultsById(id, user);
    }

    @GetMapping("/{privateKey}/results/no-auth")
    public SurveyResultsResponse getSurveyResultsNoAuth(@PathVariable UUID privateKey) {
        return surveyService.getSurveyResultsByPrivateKey(privateKey);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/user")
    public UserSurveysResponse getUserSurveys(@AuthenticationPrincipal User user) {
        return surveyService.getUserSurveys(user);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/create")
    public CreateSurveyResponse createSurvey(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody CreateSurveyRequest createSurveyRequest
    ) {
        return surveyService.createSurvey(createSurveyRequest, user);
    }

    @PostMapping("/create/no-auth")
    public CreateSurveyResponse createSurveyNoAuth(@Valid @RequestBody CreateSurveyRequest createSurveyRequest) {
        return surveyService.createSurvey(createSurveyRequest);
    }

    @PostMapping("/{publicKey}/submit")
    @ResponseStatus(HttpStatus.CREATED)
    public void submitSurveyAttendance(
            @PathVariable UUID publicKey,
            @Valid @RequestBody SubmitSurveyRequest submitSurveyRequest
    ) {
        surveyService.submitSurveyAttendance(publicKey, submitSurveyRequest);
    }
}
