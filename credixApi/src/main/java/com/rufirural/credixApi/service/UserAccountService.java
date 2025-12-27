package com.rufirural.credixApi.service;

import com.rufirural.credixApi.dto.auth.AuthResponseDto;
import com.rufirural.credixApi.dto.auth.AuthRequestDto;

import java.util.Optional;

public interface UserAccountService {
    Optional<AuthResponseDto> findByEmail(String email);
    String authenticate(AuthRequestDto loginDto); // retorna JWT
}