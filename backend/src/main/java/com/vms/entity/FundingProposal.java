package com.vms.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "funding_proposals", indexes = {@Index(name = "idx_proposal_status", columnList = "status")})
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class FundingProposal {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false, length = 1000)
    private String description;
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal requestedAmount;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "corporate_id", nullable = false)
    private Corporate corporate;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProposalStatus status = ProposalStatus.PENDING;
    private String reviewComment;
    @CreationTimestamp @Column(nullable = false, updatable = false)
    private LocalDateTime submittedAt;
}
