package com.template.backend.controllers;

import java.util.List;
import java.util.stream.Collectors;

import com.template.backend.service.AuthService;

import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.template.backend.entities.User;
import com.template.backend.payload.request.LoginRequest;
import com.template.backend.payload.request.SignupRequest;
import com.template.backend.payload.response.JwtResponse;
import com.template.backend.payload.response.MessageResponse;
import com.template.backend.repository.UserRepository;
import com.template.backend.security.services.UserDetailsImpl;

//create handlers for the endpoints
@RestController
@CrossOrigin(origins = "*" , maxAge = 3600)
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final AuthService authService;
    
    public AuthController(UserRepository userRepository, AuthService authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/providers")
    public ResponseEntity<JwtResponse> providers(@Valid @RequestBody LoginRequest loginRequest) {
        logger.info("providers");
        String jwt = authService.authenticate(loginRequest);
        logger.info("providers:::jwt:::" + jwt);
        System.out.println("providers:::jwt:::" + jwt);
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

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        authService.validateSignupRequest(signUpRequest);
        User user = authService.createNewUser(signUpRequest);
        userRepository.save(user);

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