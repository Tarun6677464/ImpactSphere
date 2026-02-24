package com.vms.service;

import com.vms.dto.*;

import java.util.List;

public interface CorporateService {
    void createCorporate(CorporateRequest request);
    FundingProposalDto createProposal(FundingProposalRequest request, String requesterEmail, boolean isAdmin);
    FundingProposalDto reviewProposal(Long proposalId, ProposalReviewRequest request);
    List<FundingProposalDto> listProposals(String status, String requesterEmail, boolean isAdmin, boolean isVolunteer);
}
