package com.vms.service.impl;

import com.vms.dto.*;
import com.vms.entity.Applicant;
import com.vms.entity.ApplicationStatus;
import com.vms.entity.Scholarship;
import com.vms.exception.ResourceNotFoundException;
import com.vms.repository.ApplicantRepository;
import com.vms.repository.ScholarshipRepository;
import com.vms.service.ScholarshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScholarshipServiceImpl implements ScholarshipService {
    private final ScholarshipRepository scholarshipRepository;
    private final ApplicantRepository applicantRepository;

    @Override
    @Transactional
    public ScholarshipDto createScholarship(ScholarshipRequest request) {
        Scholarship s = scholarshipRepository.save(Scholarship.builder().name(request.getName()).description(request.getDescription()).budget(request.getBudget()).open(true).build());
        return mapScholarship(s);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ScholarshipDto> listScholarships() {
        return scholarshipRepository.findAll().stream().map(this::mapScholarship).toList();
    }

    @Override
    @Transactional
    public ApplicantDto apply(ApplicantRequest request) {
        Scholarship scholarship = scholarshipRepository.findById(request.getScholarshipId()).orElseThrow(() -> new ResourceNotFoundException("Scholarship not found"));
        Applicant a = applicantRepository.save(Applicant.builder().fullName(request.getFullName()).email(request.getEmail().toLowerCase())
                .phone(request.getPhone()).statement(request.getStatement()).status(ApplicationStatus.SUBMITTED).scholarship(scholarship).build());
        return mapApplicant(a);
    }

    @Override
    @Transactional
    public ApplicantDto reviewApplication(Long applicantId, ApplicantReviewRequest request) {
        Applicant a = applicantRepository.findById(applicantId).orElseThrow(() -> new ResourceNotFoundException("Application not found"));
        a.setStatus(request.getStatus());
        return mapApplicant(applicantRepository.save(a));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApplicantDto> listApplicants() {
        return applicantRepository.findAll().stream().map(this::mapApplicant).toList();
    }

    private ScholarshipDto mapScholarship(Scholarship s) {
        return ScholarshipDto.builder().id(s.getId()).name(s.getName()).description(s.getDescription()).budget(s.getBudget()).open(s.isOpen()).build();
    }

    private ApplicantDto mapApplicant(Applicant a) {
        return ApplicantDto.builder().id(a.getId()).fullName(a.getFullName()).email(a.getEmail()).phone(a.getPhone()).statement(a.getStatement())
                .status(a.getStatus()).scholarshipId(a.getScholarship().getId()).scholarshipName(a.getScholarship().getName()).submittedAt(a.getSubmittedAt()).build();
    }
}
