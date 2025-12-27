package com.rufirural.credixApi.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.rufirural.credixApi.service.CreditService;
import com.rufirural.credixApi.dto.credit.CreditRequestDto;
import com.rufirural.credixApi.dto.credit.CreditResponseDto;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/credits")
@RequiredArgsConstructor
public class CreditController {

    private final CreditService service;

    @PostMapping
    public ResponseEntity<CreditResponseDto> create(@Valid @RequestBody CreditRequestDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto));
    }

    @GetMapping
    public List<CreditResponseDto> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public CreditResponseDto getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
