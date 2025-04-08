package com.template.backend.views;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "lesson_words_view")
public class LessonWordsView implements Serializable {
    @Id
    private Long lessonId;
    private String lessonTitle;
    private String lessonDescription;
    private Long wordId;
    private String word;
    private String meaning;
    private String wordType;
    private String sentence;
    private Long lessonWordsId;

    public LessonWordsView() {
    }
    
    public Long getLessonId() {
        return lessonId;
    }
    
    public Long getWordId() {
        return wordId;
    }
}
