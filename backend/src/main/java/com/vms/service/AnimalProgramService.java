package com.vms.service;

import com.vms.dto.AnimalProgramDto;
import com.vms.dto.AnimalProgramRequest;

import java.util.List;

public interface AnimalProgramService {
    AnimalProgramDto create(AnimalProgramRequest request);
    List<AnimalProgramDto> list();
}
