package com.vms.controller.admin;

import com.vms.dto.AdminAnalyticsDto;
import com.vms.dto.ApiResponse;
import com.vms.service.AdminAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/analytics")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminAnalyticsController {
    private final AdminAnalyticsService adminAnalyticsService;

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<AdminAnalyticsDto>> summary() {
        return ResponseEntity.ok(ApiResponse.<AdminAnalyticsDto>builder().success(true).message("Analytics fetched").data(adminAnalyticsService.getSummary()).build());
    }
}
