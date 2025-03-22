package com.template.backend.security;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Set allowedOrigins to * since setAllowedOriginPatterns is deprecated
        configuration.addAllowedOrigin("*");
        
        // Allowed methods - include PATCH and ensure OPTIONS is present
        configuration.setAllowedMethods(
            Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
        );
        
        // Allowed headers - simplified to include everything
        configuration.addAllowedHeader("*");
        
        // Exposed headers that clients are allowed to access
        configuration.setExposedHeaders(Arrays.asList(
            "Authorization",
            "Access-Control-Allow-Origin", 
            "Access-Control-Allow-Credentials",
            "Access-Control-Allow-Headers"
        ));
        
        // For JWT auth, credentials are not needed
        configuration.setAllowCredentials(false);
        
        // Max age for preflight requests cache
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }
    
    @Bean
    public CorsFilter corsFilter() {
        return new CorsFilter(corsConfigurationSource());
    }
}
