package com.vms.service.impl;

import com.vms.dto.AnimalProgramDto;
import com.vms.dto.AnimalProgramRequest;
import com.vms.entity.AnimalProgram;
import com.vms.repository.AnimalProgramRepository;
import com.vms.service.AnimalProgramService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnimalProgramServiceImpl implements AnimalProgramService {
    private final AnimalProgramRepository animalProgramRepository;

    @Override
    @Transactional
    public AnimalProgramDto create(AnimalProgramRequest request) {
        AnimalProgram program = animalProgramRepository.save(AnimalProgram.builder()
                .name(request.getName()).description(request.getDescription()).fundingTarget(request.getFundingTarget())
                .collectedAmount(BigDecimal.ZERO).startDate(request.getStartDate()).endDate(request.getEndDate()).active(true).build());
        return map(program);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AnimalProgramDto> list() {
        return animalProgramRepository.findAll().stream().map(this::map).toList();
    }

    private AnimalProgramDto map(AnimalProgram p) {
        return AnimalProgramDto.builder().id(p.getId()).name(p.getName()).description(p.getDescription()).fundingTarget(p.getFundingTarget())
                .collectedAmount(p.getCollectedAmount()).active(p.isActive()).startDate(p.getStartDate()).endDate(p.getEndDate()).build();
    }
}
