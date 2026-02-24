package com.vms.controller;

import com.vms.dto.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class HealthController {
    @GetMapping
    public ApiResponse<Map<String, Object>> health() {
        return ApiResponse.<Map<String, Object>>builder().success(true).message("Service is healthy")
                .data(Map.of("status", "UP", "timestamp", LocalDateTime.now().toString())).build();
    }
}
