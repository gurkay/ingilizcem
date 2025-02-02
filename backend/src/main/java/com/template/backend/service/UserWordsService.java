package com.template.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.template.backend.entities.UserWords;
import com.template.backend.repository.UserWordsRepository;

@Service
public class UserWordsService {
    @Autowired
    private UserWordsRepository userWordsRepository;

    public Page<UserWords> findByUserIdAndStatus(Long userId, String status, Pageable pageable) {
        return userWordsRepository.findByUserIdAndStatus(userId, status, pageable);
    }
}
