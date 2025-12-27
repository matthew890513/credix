package com.rufirural.credixApi.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import com.rufirural.credixApi.dto.customer.CustomerRequestDto;
import com.rufirural.credixApi.dto.customer.CustomerResponseDto;
import com.rufirural.credixApi.entity.Customer;
import com.rufirural.credixApi.exception.ResourceNotFoundException;
import com.rufirural.credixApi.repository.CustomerRepository;
import com.rufirural.credixApi.service.CustomerService;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository repository;

    @Override
    public CustomerResponseDto create(CustomerRequestDto dto) {
        Customer c = new Customer();
        c.setFirstName(dto.getFirstName());
        c.setLastName(dto.getLastName());
        c.setMiddleName(dto.getMiddleName());
        c.setBirthDate(dto.getBirthDate());
        c.setMonthlyIncome(dto.getMonthlyIncome());

        repository.save(c);
        return map(c);
    }

    @Override
    public List<CustomerResponseDto> findAll() {
        return repository.findAll().stream().map(this::map).toList();
    }

    @Override
    public CustomerResponseDto findById(Long id) {
        Customer c = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
        return map(c);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    private CustomerResponseDto map(Customer c) {
        return new CustomerResponseDto(
                c.getId(),
                c.getFirstName(),
                c.getLastName(),
                c.getMiddleName(),
                c.getBirthDate(),
                c.getMonthlyIncome()
        );
    }
}
