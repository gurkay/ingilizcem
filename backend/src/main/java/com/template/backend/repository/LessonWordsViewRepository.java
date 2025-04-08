package com.template.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.template.backend.views.LessonWordsView;

@Repository
public interface LessonWordsViewRepository extends JpaRepository<LessonWordsView, Long> {
    // Custom methods can be added here if needed
} 