package com.vms.controller;

import com.vms.dto.AdminAnalyticsDto;
import com.vms.dto.ApiResponse;
import com.vms.dto.CorporateDashboardDto;
import com.vms.dto.VolunteerDashboardDto;
import com.vms.service.AdminAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AdminAnalyticsService adminAnalyticsService;

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<AdminAnalyticsDto>> admin() {
        return ResponseEntity.ok(ApiResponse.<AdminAnalyticsDto>builder()
                .success(true)
                .message("Admin analytics fetched")
                .data(adminAnalyticsService.getSummary())
                .build());
    }

    @GetMapping("/corporate")
    @PreAuthorize("hasRole('CORPORATE')")
    public ResponseEntity<ApiResponse<CorporateDashboardDto>> corporate(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.<CorporateDashboardDto>builder()
                .success(true)
                .message("Corporate analytics fetched")
                .data(adminAnalyticsService.getCorporateSummary(authentication.getName()))
                .build());
    }

    @GetMapping("/volunteer")
    @PreAuthorize("hasRole('VOLUNTEER')")
    public ResponseEntity<ApiResponse<VolunteerDashboardDto>> volunteer() {
        return ResponseEntity.ok(ApiResponse.<VolunteerDashboardDto>builder()
                .success(true)
                .message("Volunteer analytics fetched")
                .data(adminAnalyticsService.getVolunteerSummary())
                .build());
    }
}
