package com.vms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "corporates")
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class Corporate {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, unique = true)
    private String contactEmail;
    @Column(nullable = false)
    private boolean active = true;
}
