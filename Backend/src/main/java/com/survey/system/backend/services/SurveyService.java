package com.survey.system.backend.services;

import com.survey.system.backend.dto.*;
import com.survey.system.backend.entities.Answer;
import com.survey.system.backend.entities.Question;
import com.survey.system.backend.entities.Survey;
import com.survey.system.backend.entities.User;
import com.survey.system.backend.repositories.AnswerRepository;
import com.survey.system.backend.repositories.QuestionRepository;
import com.survey.system.backend.repositories.SurveyRepository;
import com.survey.system.backend.utils.DtoConverter;
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

    public GetSurveysResponse getSurveys() {
        Set<Survey> surveys = surveyRepository.findAllWhereNotClosed();

        return DtoConverter.toGetSurveysResponse(surveys);
    }

    public GetSurveyResponse getSurveyForAttendance(UUID publicKey) {
        Survey survey = surveyRepository.findByPublicKey(publicKey);

        if (survey == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        if (survey.isClosed()) {
            throw new ResponseStatusException(HttpStatus.LOCKED);
        }

        return DtoConverter.toGetSurveyResponse(survey);
    }

    public SurveyResultsResponse getSurveyResultsById(long id, User user) {
        Survey survey = surveyRepository.findById(id);

        if (survey == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        if (survey.getOwner().getId() != user.getId()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        return DtoConverter.toSurveyResultsResponse(survey);
    }

    public SurveyResultsResponse getSurveyResultsByPrivateKey(UUID privateKey) {
        Survey survey = surveyRepository.findByPrivateKey(privateKey);

        if (survey == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        if (survey.getOwner() != null) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        return DtoConverter.toSurveyResultsResponse(survey);
    }

    public UserSurveysResponse getUserSurveys(User user) {
        Set<Survey> surveys = surveyRepository.findByOwner(user);

        if (surveys.isEmpty()) {
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
                        user
                ));

        createSurveyQuestions(survey, createSurveyRequest);

        return DtoConverter.toCreateSurveyResponse(survey);
    }

    public CreateSurveyResponseNoAuth createSurvey(CreateSurveyRequest createSurveyRequest) {
        Survey survey = surveyRepository.save(
                new Survey(
                        createSurveyRequest.getTitle(),
                        createSurveyRequest.getSubtitle(),
                        UUID.randomUUID(),
                        UUID.randomUUID()
                ));

        createSurveyQuestions(survey, createSurveyRequest);

        return DtoConverter.toCreateSurveyResponseNoAuth(survey);
    }

    private void createSurveyQuestions(Survey survey, CreateSurveyRequest createSurveyRequest) {
        createSurveyRequest.getQuestions().forEach((questionDto) -> {
            Question question = questionRepository.save(new Question(
                    questionDto.getQuestion(),
                    questionDto.getIsRequired(),
                    questionDto.getIsMultiple(),
                    survey
            ));

            List<Answer> answers = new ArrayList<Answer>();
            questionDto.getAnswers().forEach((content) -> {
                answers.add(new Answer(content, question));
            });
            answerRepository.saveAll(answers);
        });
    }

    public void submitSurveyAttendance(UUID publicKey, SubmitSurveyRequest submitSurveyRequest) {
        Survey survey = surveyRepository.findByPublicKey(publicKey);

        if (survey == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        if(survey.isClosed()){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        long requiredQuestions = survey.getQuestions().stream().filter(question -> question.isRequired()).count();
        if (requiredQuestions > submitSurveyRequest.getQuestions().size()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        survey.getQuestions().forEach(question -> {
            SubmittedQuestion submittedQuestion = getQuestionFromSubmittedQuestions(
                    question.getId(),
                    submitSurveyRequest.getQuestions()
            );

            ArrayList<Answer> answers = getAnswerFromQuestion(submittedQuestion.getAnswerIds(), question);
            if (answers.size() > 1 && !question.isMultiple()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
            }
            if (answers.size() == 0 && question.isRequired()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
            }

            answers.forEach(answer -> {
                answer.setSelectionCount(answer.getSelectionCount() + 1);
            });
            answerRepository.saveAll(answers);
        });

        survey.setParticipants(survey.getParticipants() + 1);
        surveyRepository.save(survey);
    }

    private SubmittedQuestion getQuestionFromSubmittedQuestions(long id, Set<SubmittedQuestion> submittedQuestions) {
        Optional<SubmittedQuestion> optionalQuestion = submittedQuestions.stream()
                .filter((question) -> question.getId() == id)
                .findFirst();

        if (optionalQuestion.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        return optionalQuestion.get();
    }

    private ArrayList<Answer> getAnswerFromQuestion(ArrayList<Long> ids, Question question) {
        ArrayList<Answer> answers = new ArrayList<Answer>();

        ids.forEach((id) -> {
            Optional<Answer> optionalAnswer = question.getAnswers().stream()
                    .filter(answer -> answer.getId() == id)
                    .findFirst();

            if (optionalAnswer.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
            }

            answers.add(optionalAnswer.get());
        });

        return answers;
    }

    public void modifySurvey(long id, User user){
        Survey survey = surveyRepository.findById(id);

        if(survey == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        if(survey.getOwner().getId() != user.getId()){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        survey.setClosed(!survey.isClosed());
        surveyRepository.save(survey);
    }
}
