package com.template.backend.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.template.backend.service.GoogleAIService;

@RestController
@RequestMapping({"/api/googleAi", "/googleAi"})
public class GoogleAIController {

    @Autowired
    private GoogleAIService googleAIService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateText(@RequestBody String prompt) throws IOException {
        String response = googleAIService.askQuestion(prompt);
        return ResponseEntity.ok(response);
    }
}
