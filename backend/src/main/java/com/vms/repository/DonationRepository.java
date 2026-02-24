package com.vms.repository;

import com.vms.entity.Donation;
import com.vms.entity.DonationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface DonationRepository extends JpaRepository<Donation, Long> {
    @Query("SELECT d FROM Donation d WHERE (:status IS NULL OR d.status = :status) AND (:category IS NULL OR d.programCategory = :category)")
    Page<Donation> search(@Param("status") DonationStatus status, @Param("category") String category, Pageable pageable);

    @Query("SELECT COALESCE(SUM(d.amount), 0) FROM Donation d")
    BigDecimal totalDonations();

    @Query(value = "SELECT to_char(date_trunc('month', d.date), 'YYYY-MM'), COALESCE(SUM(d.amount),0) FROM donations d GROUP BY 1 ORDER BY 1", nativeQuery = true)
    List<Object[]> monthlyDonationTotals();

    List<Donation> findTop5ByOrderByDateDesc();
}
