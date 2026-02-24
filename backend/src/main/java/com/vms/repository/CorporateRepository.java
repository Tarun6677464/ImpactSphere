package com.vms.repository;

import com.vms.entity.Corporate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CorporateRepository extends JpaRepository<Corporate, Long> {
    Optional<Corporate> findByContactEmail(String contactEmail);
}
