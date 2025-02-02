package com.template.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.template.backend.entities.UserWords;

@Repository
public interface UserWordsRepository extends JpaRepository<UserWords, Long> {
    
    @Query("SELECT uw FROM UserWords uw WHERE uw.user.id = :userId AND uw.status = :status")
    Page<UserWords> findByUserIdAndStatus(Long userId, String status, Pageable pageable);
}
