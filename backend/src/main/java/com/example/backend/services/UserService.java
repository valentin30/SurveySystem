package com.example.backend.services;


import com.example.backend.dto.auth.AuthenticateRequest;
import com.example.backend.dto.auth.CreateUserRequest;
import com.example.backend.dto.user.UserDataResponse;
import com.example.backend.entities.User;
import com.example.backend.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(CreateUserRequest createUserRequest) {
        User existingUser = userRepository.findByEmail(createUserRequest.getEmail());
        if (existingUser != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        String hashedPassword = passwordEncoder.encode(createUserRequest.getPassword());

        return userRepository.save(new User(createUserRequest.getName(), createUserRequest.getEmail(), hashedPassword));
    }

    public User findAuthUser(AuthenticateRequest authenticateRequest){
        User user = userRepository.findByEmail(authenticateRequest.getEmail());
        if(user == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        boolean matches = passwordEncoder.matches(authenticateRequest.getPassword(), user.getPassword());
        if(!matches){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        return user;
    }
}
