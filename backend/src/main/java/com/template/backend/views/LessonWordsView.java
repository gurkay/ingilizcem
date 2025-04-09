package com.template.backend.views;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "lesson_words_view")
public class LessonWordsView {
    @Id
    public Long lessonId;
    public String lessonTitle;
    public String lessonDescription;
    public Long wordId;
    public String word;
    public String meaning;
    public String wordType;
    public String sentence;
    public Long lessonWordsId;
}
