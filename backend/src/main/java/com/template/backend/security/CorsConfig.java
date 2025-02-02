package com.template.backend.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource(@Value("${app.cors.allowed-origins}") List<String> allowedOrigins) {
        // Immutable listeyi değiştirilebilir bir listeye çevir
        List<String> updatedAllowedOrigins = new ArrayList<>(allowedOrigins);
        updatedAllowedOrigins.add("http://localhost:3000");
        updatedAllowedOrigins.add("http://localhost:8080");
        updatedAllowedOrigins.add("http://127.0.0.1:8080");
        updatedAllowedOrigins.add("http://localhost:3306");

        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.setAllowedOrigins(updatedAllowedOrigins);
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
