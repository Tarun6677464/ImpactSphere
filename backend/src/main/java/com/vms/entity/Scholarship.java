package com.vms.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "scholarships")
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class Scholarship {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, length = 600)
    private String description;
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal budget;
    @Column(nullable = false)
    private boolean open = true;
}
