package com.vms.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Builder
public class AdminAnalyticsDto {
    private final BigDecimal totalDonations;
    private final BigDecimal totalCorporateFundingApproved;
    private final long activeAnimalPrograms;
    private final long scholarshipApplicationCount;
    private final List<MonthlyStatDto> monthlyStatistics;
}
