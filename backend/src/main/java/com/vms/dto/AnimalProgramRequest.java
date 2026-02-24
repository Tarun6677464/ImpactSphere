package com.vms.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter @Setter
public class AnimalProgramRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String description;
    @NotNull @DecimalMin("1.00")
    private BigDecimal fundingTarget;
    private LocalDate startDate;
    private LocalDate endDate;
}
