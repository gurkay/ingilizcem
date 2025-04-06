package com.template.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

@Service
public class GoogleAIService {

    @Value("${gemini.api-key}")
    private String apiKey;

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=";

    public String askQuestion(String prompt) throws IOException {
        try {
            RestTemplate restTemplate = new RestTemplate();
            
            // Set up headers with API key
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            Map<String, Object> content = Map.of("parts", List.of(Map.of("text", prompt)));
            Map<String, Object> request = Map.of("contents", List.of(content));
    
            headers.setContentType(MediaType.APPLICATION_JSON);
    
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);
            String url = GEMINI_API_URL + apiKey;
            try {
                ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
    
                // JSON response parsing
                Map<String, Object> responseBody = response.getBody();
                if (responseBody != null && responseBody.containsKey("candidates")) {
                    Map firstCandidate = ((List<Map>) responseBody.get("candidates")).get(0);
                    Map contentMap = (Map) firstCandidate.get("content");
                    List<Map> parts = (List<Map>) contentMap.get("parts");
                    return (String) parts.get(0).get("text");
                }
            } catch (Exception e) {
                e.printStackTrace();
                return "Hata oluştu: " + e.getMessage();
            }
    
            return "Yanıt alınamadı.";
            
        } catch (Exception e) {
            throw new IOException("Gemini API yanıtı işlenirken bir hata oluştu: " + e.getMessage(), e);
        }
    }
}