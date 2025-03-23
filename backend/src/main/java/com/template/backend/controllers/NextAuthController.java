package com.template.backend.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.template.backend.payload.request.LoginRequest;
import com.template.backend.payload.response.JwtResponse;
import com.template.backend.security.services.UserDetailsImpl;
import com.template.backend.service.AuthService;

import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * NextAuth.js'in ihtiyaç duyduğu endpoint'leri sağlar
 * Bu controller, frontend'den gelen NextAuth isteklerini karşılar
 */
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class NextAuthController {

    private static final Logger logger = LoggerFactory.getLogger(NextAuthController.class);
    private final AuthService authService;
    private JwtResponse jwtResponse;

    public NextAuthController(AuthService authService) {
        this.authService = authService;
        this.jwtResponse = new JwtResponse(); // JwtResponse nesnesini başlat
    }

    @GetMapping({ "/auth/providers", "/api/auth/providers" })
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

    @GetMapping({ "/auth/error", "/api/auth/error" })
    public ResponseEntity<?> getError() {
        logger.info("NextAuth: /auth/error veya /api/auth/error endpoint çağrıldı");

        Map<String, Object> response = new HashMap<>();
        response.put("error", "Kimlik doğrulama hatası");

        return ResponseEntity.ok(response);
    }

    @PostMapping({ "/auth/_log", "/api/auth/_log" })
    public ResponseEntity<?> postLog() {
        logger.info("NextAuth: /auth/_log veya /api/auth/_log endpoint çağrıldı");
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = { "/auth/callback/credentials", "/api/auth/callback/credentials" })
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

    @GetMapping({ "/auth/csrf", "/api/auth/csrf" })
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

    // Eğer gerekirse diğer NextAuth endpoint'leri buraya eklenebilir
}