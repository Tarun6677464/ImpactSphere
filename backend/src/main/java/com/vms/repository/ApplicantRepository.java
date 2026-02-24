package com.vms.repository;

import com.vms.entity.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ApplicantRepository extends JpaRepository<Applicant, Long> {
    @Query("SELECT COUNT(a) FROM Applicant a")
    long totalApplications();

    @Query(value = "SELECT to_char(date_trunc('month', a.submitted_at), 'YYYY-MM'), COUNT(*) FROM applicants a GROUP BY 1 ORDER BY 1", nativeQuery = true)
    List<Object[]> monthlyApplications();
}
