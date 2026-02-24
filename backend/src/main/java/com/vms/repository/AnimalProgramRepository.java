package com.vms.repository;

import com.vms.entity.AnimalProgram;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalProgramRepository extends JpaRepository<AnimalProgram, Long> {
    long countByActiveTrue();
    java.util.List<AnimalProgram> findTop5ByActiveTrueOrderByCreatedAtDesc();
}
