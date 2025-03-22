package com.template.backend.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * NextAuth.js'in ihtiyaç duyduğu endpoint'leri sağlar
 * Bu controller, frontend'den gelen NextAuth isteklerini karşılar
 */
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class NextAuthController {

    private static final Logger logger = LoggerFactory.getLogger(NextAuthController.class);

    @GetMapping({"/auth/providers", "/api/auth/providers"})
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

    @GetMapping({"/auth/error", "/api/auth/error"})
    public ResponseEntity<?> getError() {
        logger.info("NextAuth: /auth/error veya /api/auth/error endpoint çağrıldı");
        
        Map<String, Object> response = new HashMap<>();
        response.put("error", "Kimlik doğrulama hatası");
        
        return ResponseEntity.ok(response);
    }

    @PostMapping({"/auth/_log", "/api/auth/_log"})
    public ResponseEntity<?> postLog() {
        logger.info("NextAuth: /auth/_log veya /api/auth/_log endpoint çağrıldı");
        return ResponseEntity.ok().build();
    }
    
    @PostMapping(value = {"/auth/callback/credentials", "/api/auth/callback/credentials"}, 
                consumes = {"application/x-www-form-urlencoded;charset=UTF-8", "application/json"})
    public ResponseEntity<?> callbackCredentials(@RequestParam(required = false) Map<String, String> formData, 
                                               @RequestBody(required = false) Map<String, Object> jsonData) {
        logger.info("NextAuth: /auth/callback/credentials veya /api/auth/callback/credentials endpoint çağrıldı");
        
        // Log the request data for debugging
        if (formData != null && !formData.isEmpty()) {
            logger.info("Form data: {}", formData);
        }
        
        if (jsonData != null && !jsonData.isEmpty()) {
            logger.info("JSON data: {}", jsonData);
        }
        
        // Extract credentials from either form data or JSON
        String email = null;
        String password = null;
        
        if (formData != null && !formData.isEmpty()) {
            // Get email and password from form data
            email = formData.get("email");
            password = formData.get("password");
            // NextAuth specific fields
            String csrfToken = formData.get("csrfToken");
            String callbackUrl = formData.get("callbackUrl");
            String json = formData.get("json");
            
            logger.info("Form credentials - Email: {}, CSRF: {}, CallbackUrl: {}, JSON: {}", 
                     email, csrfToken, callbackUrl, json);
        } else if (jsonData != null && !jsonData.isEmpty()) {
            // Get email and password from JSON data
            email = (String) jsonData.get("email");
            password = (String) jsonData.get("password");
            logger.info("JSON credentials - Email: {}", email);
        }
        
        // This is a dummy response for testing
        // In a real application, you would validate credentials and return user data
        Map<String, Object> user = new HashMap<>();
        user.put("id", "1");
        user.put("name", "Test User");
        user.put("email", email != null ? email : "test@example.com");
        
        return ResponseEntity.ok(user);
    }
    
    @GetMapping({"/auth/csrf", "/api/auth/csrf"})
    public ResponseEntity<?> getCsrf() {
        logger.info("NextAuth: /auth/csrf veya /api/auth/csrf endpoint çağrıldı");
        
        // NextAuth expects a CSRF token
        Map<String, Object> response = new HashMap<>();
        response.put("csrfToken", "dummy-csrf-token");
        
        return ResponseEntity.ok(response);
    }
    
    // Eğer gerekirse diğer NextAuth endpoint'leri buraya eklenebilir
} 