package com.vms.service;

import com.vms.dto.DonationDto;
import com.vms.dto.DonationRequest;
import com.vms.dto.PagedResponse;
import com.vms.entity.DonationStatus;

public interface DonationService {
    DonationDto create(DonationRequest request);
    PagedResponse<DonationDto> list(int page, int size, DonationStatus status, String category);
}
