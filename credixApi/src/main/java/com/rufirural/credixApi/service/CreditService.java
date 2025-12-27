package com.rufirural.credixApi.service;

import java.util.List;
import com.rufirural.credixApi.dto.credit.CreditRequestDto;
import com.rufirural.credixApi.dto.credit.CreditResponseDto;

public interface CreditService {
    CreditResponseDto create(CreditRequestDto dto);
    List<CreditResponseDto> findAll();
    CreditResponseDto findById(Long id);
    void delete(Long id);
}
