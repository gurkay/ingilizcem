package com.template.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "words")
public class Word {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "word")
    private String word;

    @Column(name = "mean")
    private String mean;

    @Column(name = "word_type")
    private String wordType;

    @Column(name = "sentence")
    private String sentence;
}
