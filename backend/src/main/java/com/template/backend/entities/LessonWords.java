package com.template.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "lesson_words")
public class LessonWords {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "lesson_id")
    private Long lessonId;

    @Column(name = "word_id")
    private Long wordId;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "lesson_id", insertable = false, updatable = false)
    private Lesson lesson;

    @ManyToOne
    @JoinColumn(name = "word_id", insertable = false, updatable = false)
    private Word word;

    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "word_id", referencedColumnName = "word_id", insertable = false, updatable = false),
        @JoinColumn(name = "user_id", referencedColumnName = "user_id", insertable = false, updatable = false)
    })
    private UserWords userWords;

    public LessonWords() {
    }
    
    public LessonWords(Long lessonId, Long wordId, Long userId) {
        this.lessonId = lessonId;
        this.wordId = wordId;
        this.userId = userId;
    }
}
