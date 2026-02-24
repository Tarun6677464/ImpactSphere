package com.vms.service.impl;

import com.vms.dto.DonationDto;
import com.vms.dto.DonationRequest;
import com.vms.dto.PagedResponse;
import com.vms.entity.Donation;
import com.vms.entity.DonationStatus;
import com.vms.exception.ResourceNotFoundException;
import com.vms.repository.AnimalProgramRepository;
import com.vms.repository.DonationRepository;
import com.vms.service.DonationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DonationServiceImpl implements DonationService {
    private final DonationRepository donationRepository;
    private final AnimalProgramRepository animalProgramRepository;

    @Override
    @Transactional
    public DonationDto create(DonationRequest request) {
        Donation donation = Donation.builder()
                .donorName(request.getDonorName())
                .amount(request.getAmount())
                .donationType(request.getDonationType())
                .programCategory(request.getProgramCategory())
                .date(request.getDate())
                .status(request.getStatus())
                .build();
        if (request.getAnimalProgramId() != null) {
            var program = animalProgramRepository.findById(request.getAnimalProgramId()).orElseThrow(() -> new ResourceNotFoundException("Animal program not found"));
            donation.setAnimalProgram(program);
            program.setCollectedAmount(program.getCollectedAmount().add(request.getAmount()));
            animalProgramRepository.save(program);
        }
        return map(donationRepository.save(donation));
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<DonationDto> list(int page, int size, DonationStatus status, String category) {
        var result = donationRepository.search(status, category, PageRequest.of(page, size));
        return PagedResponse.<DonationDto>builder()
                .content(result.getContent().stream().map(this::map).toList())
                .page(result.getNumber())
                .size(result.getSize())
                .totalElements(result.getTotalElements())
                .totalPages(result.getTotalPages())
                .build();
    }

    private DonationDto map(Donation donation) {
        return DonationDto.builder()
                .id(donation.getId())
                .donorName(donation.getDonorName())
                .amount(donation.getAmount())
                .donationType(donation.getDonationType())
                .programCategory(donation.getProgramCategory())
                .date(donation.getDate())
                .status(donation.getStatus())
                .animalProgramId(donation.getAnimalProgram() != null ? donation.getAnimalProgram().getId() : null)
                .build();
    }
}
