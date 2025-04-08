package com.template.backend.entities;

import java.util.Date;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_words")
public class UserWords {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "word_id")
    private Word word;

    @Column(name = "status")
    private String status;

    @Column(name = "last_reviewed")
    private Date lastReviewed;

    @Column(name = "review_count")
    private int reviewCount;
    
    public UserWords() {
    }
    
    public UserWords(User user, Word word, String status, Date lastReviewed, int reviewCount) {
        this.user = user;
        this.word = word;
        this.status = status;
        this.lastReviewed = lastReviewed;
        this.reviewCount = reviewCount;
    }
}
