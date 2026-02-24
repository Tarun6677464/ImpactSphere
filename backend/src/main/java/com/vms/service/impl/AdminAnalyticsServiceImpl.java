package com.vms.service.impl;

import com.vms.dto.AdminAnalyticsDto;
import com.vms.dto.CorporateDashboardDto;
import com.vms.dto.FundingProposalDto;
import com.vms.dto.MonthlyStatDto;
import com.vms.dto.VolunteerDashboardDto;
import com.vms.entity.ProposalStatus;
import com.vms.repository.AnimalProgramRepository;
import com.vms.repository.ApplicantRepository;
import com.vms.repository.DonationRepository;
import com.vms.repository.FundingProposalRepository;
import com.vms.repository.ScholarshipRepository;
import com.vms.service.AdminAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AdminAnalyticsServiceImpl implements AdminAnalyticsService {
    private final DonationRepository donationRepository;
    private final FundingProposalRepository fundingProposalRepository;
    private final AnimalProgramRepository animalProgramRepository;
    private final ApplicantRepository applicantRepository;
    private final ScholarshipRepository scholarshipRepository;

    @Override
    @Transactional(readOnly = true)
    public AdminAnalyticsDto getSummary() {
        Map<String, MonthlyStatDto> monthly = new TreeMap<>();
        donationRepository.monthlyDonationTotals().forEach(row -> monthly.put(String.valueOf(row[0]), new MonthlyStatDto(String.valueOf(row[0]), (BigDecimal) row[1], BigDecimal.ZERO, 0L)));
        fundingProposalRepository.monthlyApprovedFunding().forEach(row -> {
            String month = String.valueOf(row[0]);
            MonthlyStatDto current = monthly.getOrDefault(month, new MonthlyStatDto(month, BigDecimal.ZERO, BigDecimal.ZERO, 0L));
            monthly.put(month, new MonthlyStatDto(month, current.getTotalDonations(), (BigDecimal) row[1], current.getScholarshipApplications()));
        });
        applicantRepository.monthlyApplications().forEach(row -> {
            String month = String.valueOf(row[0]);
            MonthlyStatDto current = monthly.getOrDefault(month, new MonthlyStatDto(month, BigDecimal.ZERO, BigDecimal.ZERO, 0L));
            monthly.put(month, new MonthlyStatDto(month, current.getTotalDonations(), current.getApprovedCorporateFunding(), ((Number) row[1]).longValue()));
        });

        return AdminAnalyticsDto.builder()
                .totalDonations(donationRepository.totalDonations())
                .totalCorporateFundingApproved(fundingProposalRepository.totalApprovedFunding())
                .activeAnimalPrograms(animalProgramRepository.countByActiveTrue())
                .scholarshipApplicationCount(applicantRepository.totalApplications())
                .monthlyStatistics(new ArrayList<>(monthly.values()))
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public CorporateDashboardDto getCorporateSummary(String corporateEmail) {
        List<FundingProposalDto> proposals = fundingProposalRepository.findByCorporateContactEmailIgnoreCase(corporateEmail)
                .stream()
                .map(this::mapFundingProposal)
                .toList();

        return CorporateDashboardDto.builder()
                .totalProposals(fundingProposalRepository.countByCorporateEmail(corporateEmail))
                .pendingProposals(fundingProposalRepository.countByCorporateEmailAndStatus(corporateEmail, ProposalStatus.PENDING))
                .approvedProposals(fundingProposalRepository.countByCorporateEmailAndStatus(corporateEmail, ProposalStatus.APPROVED))
                .rejectedProposals(fundingProposalRepository.countByCorporateEmailAndStatus(corporateEmail, ProposalStatus.REJECTED))
                .totalApprovedFunding(fundingProposalRepository.totalApprovedFundingByCorporateEmail(corporateEmail))
                .myProposals(proposals)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public VolunteerDashboardDto getVolunteerSummary() {
        List<String> activities = new ArrayList<>();

        donationRepository.findTop5ByOrderByDateDesc()
                .forEach(d -> activities.add("Donation from " + d.getDonorName() + " (" + d.getAmount() + ") on " + d.getDate()));
        animalProgramRepository.findTop5ByActiveTrueOrderByCreatedAtDesc()
                .forEach(p -> activities.add("Program active: " + p.getName() + " target " + p.getFundingTarget()));

        return VolunteerDashboardDto.builder()
                .totalDonations(donationRepository.totalDonations())
                .activePrograms(animalProgramRepository.countByActiveTrue())
                .scholarshipsAvailable(scholarshipRepository.countByOpenTrue())
                .activityFeed(activities.stream().limit(8).toList())
                .impactHighlight("Every action contributes to measurable community outcomes across education, welfare, and rescue initiatives.")
                .build();
    }

    private FundingProposalDto mapFundingProposal(com.vms.entity.FundingProposal p) {
        return FundingProposalDto.builder()
                .id(p.getId())
                .title(p.getTitle())
                .description(p.getDescription())
                .requestedAmount(p.getRequestedAmount())
                .corporateId(p.getCorporate().getId())
                .corporateName(p.getCorporate().getName())
                .status(p.getStatus())
                .reviewComment(p.getReviewComment())
                .submittedAt(p.getSubmittedAt())
                .build();
    }
}
