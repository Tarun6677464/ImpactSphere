package com.vms.dto;

import com.vms.entity.DonationStatus;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Builder
public class DonationDto {
    private final Long id;
    private final String donorName;
    private final BigDecimal amount;
    private final String donationType;
    private final String programCategory;
    private final LocalDate date;
    private final DonationStatus status;
    private final Long animalProgramId;
}
