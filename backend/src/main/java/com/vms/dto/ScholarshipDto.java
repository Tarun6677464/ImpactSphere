package com.vms.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class ScholarshipDto {
    private final Long id;
    private final String name;
    private final String description;
    private final BigDecimal budget;
    private final boolean open;
}
