package com.vms.dto;

import com.vms.entity.ApplicationStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ApplicantDto {
    private final Long id;
    private final String fullName;
    private final String email;
    private final String phone;
    private final String statement;
    private final ApplicationStatus status;
    private final Long scholarshipId;
    private final String scholarshipName;
    private final LocalDateTime submittedAt;
}
