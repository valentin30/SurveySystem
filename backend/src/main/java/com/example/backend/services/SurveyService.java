package com.example.backend.services;

import com.example.backend.dto.survey.get.GetSurveysResponse;
import com.example.backend.dto.survey.submit.SubmitSurveyRequest;
import com.example.backend.dto.survey.submit.SubmittedQuestion;
import com.example.backend.dto.survey.user.UserSurveysResponse;
import com.example.backend.dto.survey.create.CreateSurveyRequest;
import com.example.backend.dto.survey.create.CreateSurveyResponse;
import com.example.backend.dto.survey.get.GetSurveyResponse;
import com.example.backend.dto.survey.results.SurveyResultsResponse;
import com.example.backend.entities.Answer;
import com.example.backend.entities.Question;
import com.example.backend.entities.Survey;
import com.example.backend.entities.User;
import com.example.backend.repositories.AnswerRepository;
import com.example.backend.repositories.QuestionRepository;
import com.example.backend.repositories.SurveyRepository;
import com.example.backend.utils.DtoConverter;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
public class SurveyService {
    private final SurveyRepository surveyRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    public SurveyService(
            SurveyRepository surveyRepository,
            QuestionRepository questionRepository,
            AnswerRepository answerRepository
    ) {
        this.surveyRepository = surveyRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
    }

    public GetSurveysResponse getSurveys(){
        Set<Survey> surveys = surveyRepository.findAllWhereNotClosed();

        return DtoConverter.toGetSurveysResponse(surveys);
    }

    public GetSurveyResponse getSurveyForAttendance(UUID publicKey) {
        Survey survey = surveyRepository.findByPublicKey(publicKey);

        if (survey == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        if (survey.isClosed()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        return DtoConverter.toGetSurveyResponse(survey);
    }

    public SurveyResultsResponse getSurveyResultsById(long id, User user) {
        Survey survey = surveyRepository.findById(id);

        if (survey == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        if(survey.getOwner() != user){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        return DtoConverter.toSurveyResultsResponse(survey);
    }

    public SurveyResultsResponse getSurveyResultsByPrivateKey(UUID privateKey) {
        Survey survey = surveyRepository.findByPrivateKey(privateKey);

        if (survey == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        if(survey.getOwner() != null){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        return DtoConverter.toSurveyResultsResponse(survey);
    }

    public UserSurveysResponse getUserSurveys(User user) {
        Set<Survey> surveys = surveyRepository.findByOwner(user);

        if(surveys.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return DtoConverter.toUserSurveysResponse(surveys);
    }

    public CreateSurveyResponse createSurvey(CreateSurveyRequest createSurveyRequest, User user) {
        Survey survey = surveyRepository.save(
                new Survey(
                        createSurveyRequest.getTitle(),
                        createSurveyRequest.getSubtitle(),
                        UUID.randomUUID(),
                        UUID.randomUUID(),
                        user
                ));

        createSurveyQuestions(survey, createSurveyRequest);

        return DtoConverter.toCreateSurveyResponse(survey);
    }

    public CreateSurveyResponse createSurvey(CreateSurveyRequest createSurveyRequest) {
        Survey survey = surveyRepository.save(
                new Survey(
                    createSurveyRequest.getTitle(),
                    createSurveyRequest.getSubtitle(),
                    UUID.randomUUID(),
                    UUID.randomUUID()
                ));

        createSurveyQuestions(survey, createSurveyRequest);

        return DtoConverter.toCreateSurveyResponse(survey);
    }

    private void createSurveyQuestions(Survey survey, CreateSurveyRequest createSurveyRequest) {
        createSurveyRequest.getQuestions().forEach((questionDto) -> {
            Question question = questionRepository.save(new Question(questionDto.getQuestion(), survey));

            List<Answer> answers = new ArrayList<Answer>();
            questionDto.getAnswers().forEach((content) -> {
                answers.add(new Answer(content, question));
            });
            answerRepository.saveAll(answers);
        });
    }

    public void submitSurveyAttendance(UUID publicKey, SubmitSurveyRequest submitSurveyRequest) {
        Survey survey = surveyRepository.findByPublicKey(publicKey);

        if(survey == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        survey.getQuestions().forEach(question -> {
            SubmittedQuestion submittedQuestion = getQuestionFromSubmittedQuestions(
                    question.getId(),
                    submitSurveyRequest.getQuestions()
            );

            Answer answer = getAnswerFromQuestion(submittedQuestion.getAnswerId(), question);
            answer.setSelectionCount(answer.getSelectionCount() + 1);
            answerRepository.save(answer);
        });

        survey.setParticipants(survey.getParticipants() + 1);
        surveyRepository.save(survey);
    }

    private SubmittedQuestion getQuestionFromSubmittedQuestions(long id, Set<SubmittedQuestion> submittedQuestions){
        Optional<SubmittedQuestion> optionalQuestion = submittedQuestions.stream()
                .filter((question) -> question.getId() == id)
                .findFirst();

        if(optionalQuestion.isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        return optionalQuestion.get();
    }

    private Answer getAnswerFromQuestion(long id, Question question){
        Optional<Answer> optionalAnswer =  question.getAnswers().stream()
                .filter(answer -> answer.getId() == id)
                .findFirst();

        if(optionalAnswer.isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        return optionalAnswer.get();
    }
}
