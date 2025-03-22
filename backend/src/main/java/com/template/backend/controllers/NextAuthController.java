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
    
    // Eğer gerekirse diğer NextAuth endpoint'leri buraya eklenebilir
} 