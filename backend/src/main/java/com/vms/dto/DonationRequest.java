package com.vms.dto;

import com.vms.entity.DonationStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter @Setter
public class DonationRequest {
    @NotBlank
    private String donorName;
    @NotNull @DecimalMin("1.00")
    private BigDecimal amount;
    @NotBlank
    private String donationType;
    @NotBlank
    private String programCategory;
    @NotNull
    private LocalDate date;
    @NotNull
    private DonationStatus status;
    private Long animalProgramId;
}
