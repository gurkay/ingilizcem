package com.template.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.template.backend.entities.LessonWords;
import com.template.backend.entities.UserWords;
import com.template.backend.repository.LessonWordsRepository;
import com.template.backend.repository.LessonWordsViewRepository;
import com.template.backend.repository.UserWordsRepository;
import com.template.backend.views.LessonWordsView;

@Service
public class UserWordsService {
    @Autowired
    private UserWordsRepository userWordsRepository;

    @Autowired
    private LessonWordsViewRepository lessonWordsViewRepository;
    
    @Autowired
    private LessonWordsRepository lessonWordsRepository;

    public Page<UserWords> findByUserIdAndStatus(Long userId, String status, Pageable pageable) {
        return userWordsRepository.findByUserIdAndStatus(userId, status, pageable);
    }

    public void importWordsUser(Long userId) {
        List<LessonWordsView> lessonWordsView = lessonWordsViewRepository.findAll();

        for (LessonWordsView view : lessonWordsView) {
            lessonWordsRepository.save(new LessonWords(view.lessonId, view.wordId, userId));
        }
    }
}
