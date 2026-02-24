package com.vms.dto;

import com.vms.entity.ProposalStatus;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
public class FundingProposalDto {
    private final Long id;
    private final String title;
    private final String description;
    private final BigDecimal requestedAmount;
    private final Long corporateId;
    private final String corporateName;
    private final ProposalStatus status;
    private final String reviewComment;
    private final LocalDateTime submittedAt;
}
