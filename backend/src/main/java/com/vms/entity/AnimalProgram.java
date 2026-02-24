package com.vms.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "animal_programs", indexes = {@Index(name = "idx_animal_program_active", columnList = "active")})
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class AnimalProgram {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, length = 500)
    private String description;
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal fundingTarget;
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal collectedAmount = BigDecimal.ZERO;
    @Column(nullable = false)
    private boolean active = true;
    private LocalDate startDate;
    private LocalDate endDate;
    @CreationTimestamp @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
