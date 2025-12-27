package com.rufirural.credixApi.service;

import java.util.List;
import com.rufirural.credixApi.dto.customer.CustomerRequestDto;
import com.rufirural.credixApi.dto.customer.CustomerResponseDto;

public interface CustomerService {
    CustomerResponseDto create(CustomerRequestDto dto);
    List<CustomerResponseDto> findAll();
    CustomerResponseDto findById(Long id);
    void delete(Long id);
}
