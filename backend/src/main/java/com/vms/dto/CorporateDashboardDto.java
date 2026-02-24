package com.vms.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Builder
public class CorporateDashboardDto {
    private final long totalProposals;
    private final long pendingProposals;
    private final long approvedProposals;
    private final long rejectedProposals;
    private final BigDecimal totalApprovedFunding;
    private final List<FundingProposalDto> myProposals;
}
