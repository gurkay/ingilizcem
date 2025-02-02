package com.template.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.template.backend.repository.LessonRepository;
import com.template.backend.repository.LessonWordsRepository;
import com.template.backend.repository.UserWordsRepository;
import com.template.backend.entities.Lesson;
import com.template.backend.entities.LessonWords;
import com.template.backend.entities.UserWords;
import java.util.Date;

@Service
public class LessonService {
    private static final Logger logger = LoggerFactory.getLogger(LessonService.class);
    
    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private LessonWordsRepository lessonWordsRepository;

    @Autowired
    private UserWordsRepository userWordsRepository;

    public Page<Lesson> findByUserId(Long userId, Pageable pageable) {
        logger.info("LessonService:::findByUserId:::userId:::" + userId);
        Page<Lesson> lessons = lessonRepository.findByUserId(userId, pageable);
        logger.info("lessons:::" + lessons.getContent().toString());
        return lessons;
    }

    public Page<LessonWords> findByLessonIdAndSearch(Long lessonId, String searchText, Pageable pageable) {
        logger.info("LessonService:::findByLessonId:::lessonId:::" + lessonId + ":::searchText:::" + searchText);
        Page<LessonWords> lessonWords = lessonWordsRepository.findByLessonIdAndSearch(lessonId, searchText, pageable);
        logger.info("lessonWords size:::" + lessonWords.getContent().size());
        return lessonWords;
    }

    public void updateWordStatus(Long lessonWordId, String status) {
        logger.info("LessonService:::updateWordStatus:::lessonWordId:::" + lessonWordId + ":::status:::" + status);
        LessonWords lessonWord = lessonWordsRepository.findById(lessonWordId)
            .orElseThrow(() -> new RuntimeException("LessonWord not found"));

        UserWords userWord = lessonWord.getUserWords();
        if (userWord == null) {
            userWord = new UserWords();
            userWord.setUser(lessonWord.getLesson().getUser());
            userWord.setWord(lessonWord.getWord());
            userWord.setStatus(status);
            userWord.setLastReviewed(new Date());
            userWord.setReviewCount(1);
        } else {
            userWord.setStatus(status);
            userWord.setLastReviewed(new Date());
            userWord.setReviewCount(userWord.getReviewCount() + 1);
        }

        userWordsRepository.save(userWord);
        logger.info("Word status updated successfully");
    }
}
