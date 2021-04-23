package com.survey.system.backend.services;

import com.survey.system.backend.dto.AuthenticateRequest;
import com.survey.system.backend.dto.CreateUserRequest;
import com.survey.system.backend.dto.TokenResponse;
import com.survey.system.backend.entities.User;
import com.survey.system.backend.utils.Constants;
import com.survey.system.backend.utils.DtoConverter;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.UnsupportedEncodingException;

@Service
public class AuthService {
    private final UserService userService;
    private final JwtService jwtService;

    public AuthService(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    public TokenResponse signIn(AuthenticateRequest authenticateRequest) {
        User user = userService.findAuthUser(authenticateRequest);

        return getTokenResponse(user);
    }

    public TokenResponse signUp(CreateUserRequest createUserRequest) {
        User user = userService.createUser(createUserRequest);

        return getTokenResponse(user);
    }

    private TokenResponse getTokenResponse(User user){
        try {
            return new TokenResponse(jwtService.generateToken(user.getId(), Constants.EXPIRES_IN));
        } catch (UnsupportedEncodingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
