package com.example.backend.repositories;

import com.example.backend.entities.Survey;
import com.example.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;
import java.util.UUID;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Long> {


    @Query("""
            select survey
            from Survey survey
            where survey.isClosed = false
            """)
    Set<Survey> findAllWhereNotClosed();

    Survey findByPublicKey(UUID publicKey);

    Survey findByPrivateKey(UUID privateKey);

    Survey findById(long id);

    Set<Survey> findByOwner(User owner);
}