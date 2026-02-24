package com.vms.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter
public class FundingProposalRequest {
    @NotBlank
    private String title;
    @NotBlank
    private String description;
    @NotNull @DecimalMin("1.00")
    private BigDecimal requestedAmount;
    private Long corporateId;
}
