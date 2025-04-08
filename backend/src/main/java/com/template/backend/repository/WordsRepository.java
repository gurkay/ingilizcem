package com.template.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.template.backend.entities.Word;

public interface WordsRepository extends JpaRepository<Word, Long> {
    @Query("SELECT w FROM Word w WHERE w.wordType = :wordType")
    List<Word> findByWordType(@Param("wordType") String wordType);
}
