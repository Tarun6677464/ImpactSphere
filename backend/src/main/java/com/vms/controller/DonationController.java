package com.vms.controller;

import com.vms.dto.*;
import com.vms.entity.DonationStatus;
import com.vms.service.DonationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/donations")
@RequiredArgsConstructor
public class DonationController {
    private final DonationService donationService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','VOLUNTEER','CORPORATE')")
    public ResponseEntity<ApiResponse<DonationDto>> create(@Valid @RequestBody DonationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<DonationDto>builder().success(true).message("Donation created").data(donationService.create(request)).build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<DonationDto>>> list(@RequestParam(defaultValue = "0") int page,
                                                                         @RequestParam(defaultValue = "10") int size,
                                                                         @RequestParam(required = false) DonationStatus status,
                                                                         @RequestParam(required = false) String category) {
        return ResponseEntity.ok(ApiResponse.<PagedResponse<DonationDto>>builder().success(true).message("Donations fetched").data(donationService.list(page, size, status, category)).build());
    }
}
