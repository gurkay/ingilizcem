package com.template.backend.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    private JwtResponse jwtResponse;
    
    public AuthController(UserRepository userRepository, AuthService authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @GetMapping("/providers")
    public ResponseEntity<?> getProviders() {
        logger.info("NextAuth: /auth/providers veya /api/auth/providers endpoint çağrıldı");

        // NextAuth credentials provider configuration
        Map<String, Object> credentials = new HashMap<>();
        credentials.put("id", "credentials");
        credentials.put("name", "Credentials");
        credentials.put("type", "credentials");
        credentials.put("signinUrl", "/api/auth/signin");

        Map<String, Object> response = new HashMap<>();
        response.put("credentials", credentials);

        logger.info("Returning NextAuth providers: {}", response);
        return ResponseEntity.ok(response);

    }

    @GetMapping("/error")
    public ResponseEntity<?> getError() {
        logger.info("NextAuth: /auth/error veya /api/auth/error endpoint çağrıldı");

        Map<String, Object> response = new HashMap<>();
        response.put("error", "Kimlik doğrulama hatası");

        return ResponseEntity.ok(response);
    }

    @PostMapping("/_log")
    public ResponseEntity<?> postLog() {
        logger.info("NextAuth: /auth/_log veya /api/auth/_log endpoint çağrıldı");
        return ResponseEntity.ok().build();
    }

    @PostMapping("/callback/credentials")
    public ResponseEntity<?> callbackCredentials(@RequestParam Map<String, String> formData) {
        logger.info("NextAuth: /auth/callback/credentials veya /api/auth/callback/credentials endpoint çağrıldı");
        logger.info("Form data received: {}", formData);

        String email = formData.get("email");
        String password = formData.get("password");
        String csrfToken = formData.get("csrfToken");
        String callbackUrl = formData.get("callbackUrl");
        String json = formData.get("json");

        logger.info("Processing credentials - Email: {}, CSRF: {}, CallbackUrl: {}", email, csrfToken, callbackUrl);

        // return ResponseEntity.ok(user);

        logger.info("NextAuth:::authenticateUser: " + email + " " + password);
        String jwt = authService.authenticate(new LoginRequest(email, password));
        logger.info("NextAuth:::authenticateUser:::jwt:" + jwt);
        UserDetailsImpl userDetails = (UserDetailsImpl) authService.getUserDetails(email);
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        logger.info("NextAuth:::authenticateUser:::roles:" + roles);

        jwtResponse.setAccessToken(jwt);
        jwtResponse.setId(userDetails.getId());
        jwtResponse.setUsername(userDetails.getUsername());
        jwtResponse.setEmail(userDetails.getEmail());
        jwtResponse.setRoles(roles);

        // Return a user object that matches NextAuth's expected format
        Map<String, Object> user = new HashMap<>();
        user.put("id", jwtResponse.getId());
        user.put("name", jwtResponse.getUsername());
        user.put("email", jwtResponse.getEmail());
        user.put("accessToken", jwtResponse.getAccessToken());
        user.put("roles", jwtResponse.getRoles());

        logger.info("NextAuth:::authenticateUser:::user:" + user);

        return ResponseEntity.ok(user);
    }

    @GetMapping("/csrf")
    public ResponseEntity<?> getCsrf() {
        logger.info("NextAuth: /auth/csrf veya /api/auth/csrf endpoint çağrıldı");
        logger.info("NextAuth:::getCsrf:::jwtResponse:" + jwtResponse);
        // NextAuth expects a CSRF token
        Map<String, Object> response = new HashMap<>();
        
        // Güvenli null kontrolü
        String token = (jwtResponse != null && jwtResponse.getAccessToken() != null) 
            ? jwtResponse.getAccessToken() 
            : "csrf-token-placeholder";
            
        response.put("csrfToken", token);

        return ResponseEntity.ok(response);
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