package com.rufirural.credixApi.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import com.rufirural.credixApi.dto.credit.CreditRequestDto;
import com.rufirural.credixApi.dto.credit.CreditResponseDto;
import com.rufirural.credixApi.entity.Credit;
import com.rufirural.credixApi.entity.Customer;
import com.rufirural.credixApi.exception.ResourceNotFoundException;
import com.rufirural.credixApi.repository.CreditRepository;
import com.rufirural.credixApi.repository.CustomerRepository;
import com.rufirural.credixApi.service.CreditService;

@Service
@RequiredArgsConstructor
public class CreditServiceImpl implements CreditService {

    private final CreditRepository creditRepository;
    private final CustomerRepository customerRepository;

    @Override
    public CreditResponseDto create(CreditRequestDto dto) {
        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        Credit credit = new Credit();
        credit.setAmount(dto.getAmount());
        credit.setDeliveryDate(dto.getDeliveryDate());
        credit.setPaymentFrequency(dto.getPaymentFrequency());
        credit.setStatus(dto.getStatus());
        credit.setCustomer(customer);

        creditRepository.save(credit);
        return map(credit);
    }

    @Override
    public List<CreditResponseDto> findAll() {
        return creditRepository.findAll().stream().map(this::map).toList();
    }

    @Override
    public CreditResponseDto findById(Long id) { // <-- cambiar Integer a Long
        Credit credit = creditRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Credit not found"));
        return map(credit);
    }

    @Override
    public void delete(Long id) { // <-- cambiar Integer a Long
        creditRepository.deleteById(id);
    }

    private CreditResponseDto map(Credit c) {
        return new CreditResponseDto(
                c.getId(),
                c.getAmount(),
                c.getDeliveryDate(),
                c.getPaymentFrequency(),
                c.getStatus(),
                c.getCustomer().getId()
        );
    }
}
