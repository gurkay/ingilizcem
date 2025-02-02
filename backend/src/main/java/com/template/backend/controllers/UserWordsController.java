package com.template.backend.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.template.backend.entities.UserWords;
import com.template.backend.service.UserWordsService;

@RestController
@RequestMapping("/api/user-words")
public class UserWordsController {

    @Autowired
    private UserWordsService userWordsService;

    @GetMapping("/findByUserIdAndStatus/{userId}")
    public ResponseEntity<Page<UserWords>> findByUserIdAndStatus(
            @PathVariable Long userId,
            @RequestParam String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id,desc") String[] sort) {

        List<Sort.Order> orders = new ArrayList<>();
        if (sort[0].contains(",")) {
            for (String sortOrder : sort) {
                String[] _sort = sortOrder.split(",");
                orders.add(new Sort.Order(
                        _sort[1].equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC,
                        _sort[0]));
            }
        } else {
            orders.add(new Sort.Order(
                    sort[1].equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC,
                    sort[0]));
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(orders));

        Page<UserWords> userWords = userWordsService.findByUserIdAndStatus(userId, status, pageable);
        return ResponseEntity.ok(userWords);
    }
}
