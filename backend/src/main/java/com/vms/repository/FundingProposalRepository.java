package com.vms.repository;

import com.vms.entity.FundingProposal;
import com.vms.entity.ProposalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface FundingProposalRepository extends JpaRepository<FundingProposal, Long> {
    List<FundingProposal> findByStatus(ProposalStatus status);
    List<FundingProposal> findByCorporateContactEmailIgnoreCase(String contactEmail);
    List<FundingProposal> findByCorporateContactEmailIgnoreCaseAndStatus(String contactEmail, ProposalStatus status);

    @Query("SELECT COUNT(f) FROM FundingProposal f WHERE lower(f.corporate.contactEmail) = lower(:email)")
    long countByCorporateEmail(@Param("email") String email);

    @Query("SELECT COUNT(f) FROM FundingProposal f WHERE lower(f.corporate.contactEmail) = lower(:email) AND f.status = :status")
    long countByCorporateEmailAndStatus(@Param("email") String email, @Param("status") ProposalStatus status);

    @Query("SELECT COALESCE(SUM(f.requestedAmount), 0) FROM FundingProposal f WHERE lower(f.corporate.contactEmail) = lower(:email) AND f.status = com.vms.entity.ProposalStatus.APPROVED")
    BigDecimal totalApprovedFundingByCorporateEmail(@Param("email") String email);

    @Query("SELECT COALESCE(SUM(f.requestedAmount),0) FROM FundingProposal f WHERE f.status = com.vms.entity.ProposalStatus.APPROVED")
    BigDecimal totalApprovedFunding();

    @Query(value = "SELECT to_char(date_trunc('month', fp.submitted_at), 'YYYY-MM'), COALESCE(SUM(CASE WHEN fp.status = 'APPROVED' THEN fp.requested_amount ELSE 0 END),0) FROM funding_proposals fp GROUP BY 1 ORDER BY 1", nativeQuery = true)
    List<Object[]> monthlyApprovedFunding();
}
