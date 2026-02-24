package com.vms.service;

import com.vms.dto.*;

import java.util.List;

public interface ScholarshipService {
    ScholarshipDto createScholarship(ScholarshipRequest request);
    List<ScholarshipDto> listScholarships();
    ApplicantDto apply(ApplicantRequest request);
    ApplicantDto reviewApplication(Long applicantId, ApplicantReviewRequest request);
    List<ApplicantDto> listApplicants();
}
