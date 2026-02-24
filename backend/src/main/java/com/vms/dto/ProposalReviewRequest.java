package com.vms.dto;

import com.vms.entity.ProposalStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProposalReviewRequest {
    @NotNull
    private ProposalStatus status;
    private String reviewComment;
}
