package com.vms.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Builder
public class VolunteerDashboardDto {
    private final BigDecimal totalDonations;
    private final long activePrograms;
    private final long scholarshipsAvailable;
    private final List<String> activityFeed;
    private final String impactHighlight;
}
