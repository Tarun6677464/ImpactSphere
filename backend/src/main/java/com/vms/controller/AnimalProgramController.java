package com.vms.controller;

import com.vms.dto.AnimalProgramDto;
import com.vms.dto.AnimalProgramRequest;
import com.vms.dto.ApiResponse;
import com.vms.service.AnimalProgramService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/animal-programs")
@RequiredArgsConstructor
public class AnimalProgramController {
    private final AnimalProgramService animalProgramService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<AnimalProgramDto>> create(@Valid @RequestBody AnimalProgramRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<AnimalProgramDto>builder().success(true).message("Animal program created").data(animalProgramService.create(request)).build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<AnimalProgramDto>>> list() {
        return ResponseEntity.ok(ApiResponse.<List<AnimalProgramDto>>builder().success(true).message("Animal programs fetched").data(animalProgramService.list()).build());
    }
}
