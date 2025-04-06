package com.template.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.template.backend.entities.Lesson;
import com.template.backend.entities.LessonWords;
import com.template.backend.service.LessonService;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping({"/api/lessons", "/lessons"})
public class LessonController {

    @Autowired
    private LessonService lessonService;

    @GetMapping("/findByUserId/{userId}")
    public ResponseEntity<Page<Lesson>> findByUserId(
            @PathVariable Long userId,
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

            Page<Lesson> lessons = lessonService.findByUserId(userId, pageable);
            return ResponseEntity.ok(lessons);
    }

    @GetMapping("/findByLessonId/{lessonId}")
    public ResponseEntity<Page<LessonWords>> findByLessonId(
            @PathVariable Long lessonId,
            @RequestParam(required = false) String searchText,
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

        Page<LessonWords> lessonWords = lessonService.findByLessonIdAndSearch(lessonId, searchText, pageable);
        return ResponseEntity.ok(lessonWords);
    }

    @PutMapping("/updateWordStatus/{lessonWordId}")
    public ResponseEntity<?> updateWordStatus(
            @PathVariable Long lessonWordId,
            @RequestParam String status) {
        try {
            lessonService.updateWordStatus(lessonWordId, status);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
