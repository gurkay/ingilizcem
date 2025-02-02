package com.template.backend.repository;

import com.template.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;

// Use ReactiveCrudRepository instead of JpaRepository
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Boolean existsByEmail(String email);

    //find by email
    Optional<User> findByEmail(String email);

}
