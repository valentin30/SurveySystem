package com.example.backend.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Service
public class JwtService {
    private final String secret;

    public JwtService(@Value("${jwt.secret}") String secret) {
        this.secret = secret;
    }

    public String generateToken(long subject, int expiresInInSeconds) throws UnsupportedEncodingException {
        LocalDateTime expirationDateTime = LocalDateTime.now()
                .plusSeconds(expiresInInSeconds);
        return JWT.create()
                .withSubject(String.valueOf(subject))
                .withExpiresAt(Date.from(expirationDateTime.atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC256(secret));
    }

    public long getSubjectFromToken(String token) throws UnsupportedEncodingException, JWTVerificationException {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secret))
                .build();
        String subject = verifier.verify(token)
                .getSubject();
        return Long.parseLong(subject);
    }
}
