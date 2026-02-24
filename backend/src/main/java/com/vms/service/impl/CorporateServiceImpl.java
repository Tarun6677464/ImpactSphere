package com.vms.service.impl;

import com.vms.dto.*;
import com.vms.entity.Corporate;
import com.vms.entity.FundingProposal;
import com.vms.entity.ProposalStatus;
import com.vms.exception.BadRequestException;
import com.vms.exception.ResourceNotFoundException;
import com.vms.repository.CorporateRepository;
import com.vms.repository.FundingProposalRepository;
import com.vms.service.CorporateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CorporateServiceImpl implements CorporateService {
    private final CorporateRepository corporateRepository;
    private final FundingProposalRepository fundingProposalRepository;

    @Override
    @Transactional
    public void createCorporate(CorporateRequest request) {
        corporateRepository.save(Corporate.builder().name(request.getName()).contactEmail(request.getContactEmail().toLowerCase()).active(true).build());
    }

    @Override
    @Transactional
    public FundingProposalDto createProposal(FundingProposalRequest request, String requesterEmail, boolean isAdmin) {
        Corporate corporate = resolveCorporate(request, requesterEmail, isAdmin);
        FundingProposal proposal = fundingProposalRepository.save(FundingProposal.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .requestedAmount(request.getRequestedAmount())
                .corporate(corporate)
                .status(ProposalStatus.PENDING)
                .build());
        return map(proposal);
    }

    private Corporate resolveCorporate(FundingProposalRequest request, String requesterEmail, boolean isAdmin) {
        if (isAdmin) {
            if (request.getCorporateId() == null) {
                throw new BadRequestException("corporateId is required for admin proposal submission");
            }
            return corporateRepository.findById(request.getCorporateId())
                    .orElseThrow(() -> new ResourceNotFoundException("Corporate not found"));
        }

        if (requesterEmail == null || requesterEmail.isBlank()) {
            throw new BadRequestException("Unable to resolve requester identity");
        }

        return corporateRepository.findByContactEmail(requesterEmail.toLowerCase())
                .orElseGet(() -> corporateRepository.save(Corporate.builder()
                        .name(deriveCorporateName(requesterEmail))
                        .contactEmail(requesterEmail.toLowerCase())
                        .active(true)
                        .build()));
    }

    private String deriveCorporateName(String email) {
        int at = email.indexOf("@");
        if (at <= 0) {
            return "Corporate Account";
        }
        String local = email.substring(0, at).replace(".", " ").replace("_", " ").trim();
        if (local.isBlank()) {
            return "Corporate Account";
        }
        return Character.toUpperCase(local.charAt(0)) + local.substring(1);
    }

    @Override
    @Transactional
    public FundingProposalDto reviewProposal(Long proposalId, ProposalReviewRequest request) {
        FundingProposal proposal = fundingProposalRepository.findById(proposalId).orElseThrow(() -> new ResourceNotFoundException("Proposal not found"));
        if (request.getStatus() == ProposalStatus.PENDING) throw new BadRequestException("Status must be APPROVED or REJECTED");
        proposal.setStatus(request.getStatus());
        proposal.setReviewComment(request.getReviewComment());
        return map(fundingProposalRepository.save(proposal));
    }

    @Override
    @Transactional(readOnly = true)
    public List<FundingProposalDto> listProposals(String status, String requesterEmail, boolean isAdmin, boolean isVolunteer) {
        ProposalStatus parsedStatus = null;
        if (status != null && !status.isBlank()) {
            parsedStatus = ProposalStatus.valueOf(status.toUpperCase());
        }

        if (isAdmin) {
            return parsedStatus == null
                    ? fundingProposalRepository.findAll().stream().map(this::map).toList()
                    : fundingProposalRepository.findByStatus(parsedStatus).stream().map(this::map).toList();
        }

        if (isVolunteer) {
            return fundingProposalRepository.findByStatus(ProposalStatus.APPROVED).stream().map(this::map).toList();
        }

        if (requesterEmail == null || requesterEmail.isBlank()) {
            throw new BadRequestException("Unable to resolve requester identity");
        }

        return parsedStatus == null
                ? fundingProposalRepository.findByCorporateContactEmailIgnoreCase(requesterEmail).stream().map(this::map).toList()
                : fundingProposalRepository.findByCorporateContactEmailIgnoreCaseAndStatus(requesterEmail, parsedStatus).stream().map(this::map).toList();
    }

    private FundingProposalDto map(FundingProposal p) {
        return FundingProposalDto.builder()
                .id(p.getId()).title(p.getTitle()).description(p.getDescription()).requestedAmount(p.getRequestedAmount())
                .corporateId(p.getCorporate().getId()).corporateName(p.getCorporate().getName())
                .status(p.getStatus()).reviewComment(p.getReviewComment()).submittedAt(p.getSubmittedAt()).build();
    }
}
