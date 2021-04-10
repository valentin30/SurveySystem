package com.example.backend.utils;

import com.example.backend.dto.*;
import com.example.backend.entities.Answer;
import com.example.backend.entities.Question;
import com.example.backend.entities.Survey;

import java.util.Set;
import java.util.stream.Collectors;

public class DtoConverter {

    public static GetSurveysResponse toGetSurveysResponse(Set<Survey> entities){
        Set<SurveyLinkDto> surveys = entities.stream().map(DtoConverter::toSurveyLinkDto).collect(Collectors.toSet());
        return new GetSurveysResponse(surveys);
    }

    public static UserSurveysResponse toUserSurveysResponse(Set<Survey> entities){
        Set<UserSurveyDto> surveys = entities.stream().map(DtoConverter::toUserSurveyDto).collect(Collectors.toSet());
        return new UserSurveysResponse(surveys);
    }

    public static CreateSurveyResponse toCreateSurveyResponse(Survey survey){
        return new CreateSurveyResponse(survey.getPublicKey(), survey.getPrivateKey());
    }

    public static GetSurveyResponse toGetSurveyResponse(Survey entity) {
        Set<QuestionDto> questions = entity.getQuestions().stream()
                .map(DtoConverter::toQuestionDto)
                .collect(Collectors.toSet());

        return new GetSurveyResponse(entity.getId(), entity.getTitle(), entity.getSubtitle(), entity.getPublicKey(), questions);
    }

    public static SurveyResultsResponse toSurveyResultsResponse(Survey entity) {
        Set<QuestionWithResultsDto> questions = entity.getQuestions().stream()
                .map(DtoConverter::toQuestionWithResultsDto)
                .collect(Collectors.toSet());

        return new SurveyResultsResponse(
                entity.getId(),
                entity.getTitle(),
                entity.getSubtitle(),
                entity.getPublicKey(),
                entity.getPrivateKey(),
                entity.isClosed(),
                entity.getParticipants(),
                questions
        );
    }

    public static SurveyLinkDto toSurveyLinkDto(Survey entity){
        return new SurveyLinkDto(entity.getId(), entity.getTitle(), entity.getSubtitle(), entity.getPublicKey());
    }

    public static UserSurveyDto toUserSurveyDto(Survey entity){
        return new UserSurveyDto(entity.getId(), entity.getTitle(), entity.getSubtitle());
    }

    public static QuestionDto toQuestionDto(Question entity) {
        Set<AnswerDto> answers = entity.getAnswers().stream()
                .map(DtoConverter::toAnswerDto)
                .collect(Collectors.toSet());

        return new QuestionDto(entity.getId(), entity.getContent(), answers);
    }

    public static QuestionWithResultsDto toQuestionWithResultsDto(Question entity) {
        Set<AnswerWithResultsDto> answers = entity.getAnswers().stream()
                .map(DtoConverter::toAnswerWithResultsDto)
                .collect(Collectors.toSet());

        return new QuestionWithResultsDto(entity.getId(), entity.getContent(), answers);
    }


    public static AnswerDto toAnswerDto(Answer entity) {
        return new AnswerDto(entity.getId(), entity.getContent());
    }

    public static AnswerWithResultsDto toAnswerWithResultsDto(Answer entity) {
        return new AnswerWithResultsDto(entity.getId(), entity.getContent(), entity.getSelectionCount());
    }
}
