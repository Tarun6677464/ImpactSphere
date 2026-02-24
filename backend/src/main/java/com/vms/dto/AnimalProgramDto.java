package com.vms.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Builder
public class AnimalProgramDto {
    private final Long id;
    private final String name;
    private final String description;
    private final BigDecimal fundingTarget;
    private final BigDecimal collectedAmount;
    private final boolean active;
    private final LocalDate startDate;
    private final LocalDate endDate;
}
