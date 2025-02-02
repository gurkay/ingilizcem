package com.template.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.template.backend.entities.LessonWords;

@Repository
public interface LessonWordsRepository extends JpaRepository<LessonWords, Long> {
    @Query("SELECT lw FROM LessonWords lw WHERE lw.lessonId = :lessonId " +
           "AND (:searchText IS NULL OR LOWER(lw.word.word) LIKE LOWER(CONCAT('%', :searchText, '%')) " +
           "OR LOWER(lw.userWords.status) LIKE LOWER(CONCAT('%', :searchText, '%')))")
    Page<LessonWords> findByLessonIdAndSearch(
        @Param("lessonId") Long lessonId,
        @Param("searchText") String searchText,
        Pageable pageable
    );
} 