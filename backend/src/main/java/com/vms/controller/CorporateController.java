package com.vms.controller;

import com.vms.dto.*;
import com.vms.service.CorporateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/corporate")
@RequiredArgsConstructor
public class CorporateController {
    private final CorporateService corporateService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','CORPORATE')")
    public ResponseEntity<ApiResponse<Void>> createCorporate(@Valid @RequestBody CorporateRequest request) {
        corporateService.createCorporate(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<Void>builder().success(true).message("Corporate created").data(null).build());
    }

    @PostMapping("/proposals")
    @PreAuthorize("hasAnyRole('ADMIN','CORPORATE')")
    public ResponseEntity<ApiResponse<FundingProposalDto>> createProposal(@Valid @RequestBody FundingProposalRequest request,
                                                                          Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<FundingProposalDto>builder()
                .success(true)
                .message("Proposal submitted")
                .data(corporateService.createProposal(request, authentication.getName(), isAdmin))
                .build());
    }

    @PatchMapping("/proposals/{proposalId}/review")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<FundingProposalDto>> reviewProposal(@PathVariable Long proposalId, @Valid @RequestBody ProposalReviewRequest request) {
        return ResponseEntity.ok(ApiResponse.<FundingProposalDto>builder().success(true).message("Proposal reviewed").data(corporateService.reviewProposal(proposalId, request)).build());
    }

    @GetMapping("/proposals")
    @PreAuthorize("hasAnyRole('ADMIN','CORPORATE','VOLUNTEER')")
    public ResponseEntity<ApiResponse<List<FundingProposalDto>>> listProposals(@RequestParam(required = false) String status,
                                                                                Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities().stream().anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));
        boolean isVolunteer = authentication.getAuthorities().stream().anyMatch(a -> "ROLE_VOLUNTEER".equals(a.getAuthority()));
        return ResponseEntity.ok(ApiResponse.<List<FundingProposalDto>>builder()
                .success(true)
                .message("Proposals fetched")
                .data(corporateService.listProposals(status, authentication.getName(), isAdmin, isVolunteer))
                .build());
    }
}
