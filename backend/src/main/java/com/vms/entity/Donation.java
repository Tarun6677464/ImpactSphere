package com.vms.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "donations", indexes = {
        @Index(name = "idx_donation_date", columnList = "date"),
        @Index(name = "idx_donation_status", columnList = "status")
})
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class Donation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String donorName;
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;
    @Column(nullable = false)
    private String donationType;
    @Column(nullable = false)
    private String programCategory;
    @Column(nullable = false)
    private LocalDate date;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DonationStatus status;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_program_id")
    private AnimalProgram animalProgram;
}
