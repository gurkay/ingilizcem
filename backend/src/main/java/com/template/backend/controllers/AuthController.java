package com.template.backend.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.template.backend.service.AuthService;
import com.template.backend.views.LessonWordsView;

import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.template.backend.entities.LessonWords;
import com.template.backend.entities.User;
import com.template.backend.entities.UserWords;
import com.template.backend.entities.Word;
import com.template.backend.payload.request.LoginRequest;
import com.template.backend.payload.request.SignupRequest;
import com.template.backend.payload.response.JwtResponse;
import com.template.backend.payload.response.MessageResponse;
import com.template.backend.repository.LessonWordsRepository;
import com.template.backend.repository.LessonWordsViewRepository;
import com.template.backend.repository.UserRepository;
import com.template.backend.repository.UserWordsRepository;
import com.template.backend.repository.WordsRepository;
import com.template.backend.security.services.UserDetailsImpl;

//create handlers for the endpoints
@RestController
@CrossOrigin(origins = "*" , maxAge = 3600)
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final UserWordsRepository userWordsRepository;
    private final WordsRepository wordsRepository;
    private final LessonWordsRepository lessonWordsRepository;
    private final AuthService authService;
    // private JwtResponse jwtResponse;
    
    public AuthController(
            UserRepository userRepository, 
            UserWordsRepository userWordsRepository, 
            WordsRepository wordsRepository, 
            LessonWordsRepository lessonWordsRepository, 
            LessonWordsViewRepository lessonWordsViewRepository, 
            AuthService authService) {
        this.userRepository = userRepository;
        this.userWordsRepository = userWordsRepository;
        this.wordsRepository = wordsRepository;
        this.lessonWordsRepository = lessonWordsRepository;
        this.authService = authService;
    }

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/signin")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        logger.info("authenticateUser");
        String jwt = authService.authenticate(loginRequest);
        logger.info("authenticateUser:::jwt:::" + jwt);
        System.out.println("authenticateUser:::jwt:::" + jwt);
        UserDetailsImpl userDetails = (UserDetailsImpl) authService.getUserDetails(loginRequest.getEmail());
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile() {
        logger.info("profile:::getProfile:::");
        return ResponseEntity.ok().build();
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        authService.validateSignupRequest(signUpRequest);
        User user = authService.createNewUser(signUpRequest);
        User newUser = userRepository.save(user);
        List<Word> wordsList = wordsRepository.findAll();

        for (Word word : wordsList) {
            userWordsRepository.save(new UserWords(newUser, word, "NEW", null, 0));
        }
        
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        try {
            User user = authService.getUserByEmail(email);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // NextAuth related endpoints have been moved to NextAuthController
}