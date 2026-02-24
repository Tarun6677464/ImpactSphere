package com.vms.dto;

import com.vms.entity.ApplicationStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ApplicantReviewRequest {
    @NotNull
    private ApplicationStatus status;
}
