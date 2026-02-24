package com.vms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class MonthlyStatDto {
    private String month;
    private BigDecimal totalDonations;
    private BigDecimal approvedCorporateFunding;
    private Long scholarshipApplications;
}
