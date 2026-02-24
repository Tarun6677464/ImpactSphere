package com.vms.controller;

import com.vms.dto.*;
import com.vms.service.ScholarshipService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scholarships")
@RequiredArgsConstructor
public class ScholarshipController {
    private final ScholarshipService scholarshipService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ScholarshipDto>> create(@Valid @RequestBody ScholarshipRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<ScholarshipDto>builder().success(true).message("Scholarship created").data(scholarshipService.createScholarship(request)).build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ScholarshipDto>>> listScholarships() {
        return ResponseEntity.ok(ApiResponse.<List<ScholarshipDto>>builder().success(true).message("Scholarships fetched").data(scholarshipService.listScholarships()).build());
    }

    @PostMapping("/applications")
    @PreAuthorize("hasAnyRole('VOLUNTEER','ADMIN')")
    public ResponseEntity<ApiResponse<ApplicantDto>> apply(@Valid @RequestBody ApplicantRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<ApplicantDto>builder().success(true).message("Application submitted").data(scholarshipService.apply(request)).build());
    }

    @PatchMapping("/applications/{applicantId}/review")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ApplicantDto>> review(@PathVariable Long applicantId, @Valid @RequestBody ApplicantReviewRequest request) {
        return ResponseEntity.ok(ApiResponse.<ApplicantDto>builder().success(true).message("Application reviewed").data(scholarshipService.reviewApplication(applicantId, request)).build());
    }

    @GetMapping("/applications")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<ApplicantDto>>> listApplicants() {
        return ResponseEntity.ok(ApiResponse.<List<ApplicantDto>>builder().success(true).message("Applications fetched").data(scholarshipService.listApplicants()).build());
    }
}
