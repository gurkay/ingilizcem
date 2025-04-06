package com.template.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
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

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    public String askQuestion(String question) throws IOException {
        try {
            RestTemplate restTemplate = new RestTemplate();
            
            // Set up headers with API key
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            // Create request body
            Map<String, Object> requestBody = new HashMap<>();
            
            List<Map<String, Object>> contents = new ArrayList<>();
            Map<String, Object> content = new HashMap<>();
            Map<String, Object> requestPart = new HashMap<>();
            
            requestPart.put("text", question);
            content.put("parts", List.of(requestPart));
            contents.add(content);
            
            requestBody.put("contents", contents);
            
            // Add generation parameters
            Map<String, Object> generationConfig = new HashMap<>();
            generationConfig.put("temperature", 0.8);
            generationConfig.put("maxOutputTokens", 200);
            generationConfig.put("topP", 0.9);
            requestBody.put("generationConfig", generationConfig);
            
            // Create HttpEntity with headers and body
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            
            // Append API key as query parameter
            String url = GEMINI_API_URL + "?key=" + apiKey;
            // Make the API call
            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);
            Map<String, Object> responseBody = response.getBody();
            
            // Extract text from response (nested structure might vary based on API docs)
            if (responseBody != null) {
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
                    Map<String, Object> candidate = candidates.get(0);
                    List<Map<String, Object>> candidateContents = (List<Map<String, Object>>) candidate.get("content");
                    if (candidateContents != null && !candidateContents.isEmpty()) {
                        Map<String, Object> candidateContent = candidateContents.get(0);
                        List<Map<String, Object>> responseParts = (List<Map<String, Object>>) candidateContent.get("parts");
                        if (responseParts != null && !responseParts.isEmpty()) {
                            return (String) responseParts.get(0).get("text");
                        }
                    }
                }
            }
            
            return "Cevap bulunamadı.";
            
        } catch (Exception e) {
            throw new IOException("Gemini API yanıtı işlenirken bir hata oluştu: " + e.getMessage(), e);
        }
    }
}