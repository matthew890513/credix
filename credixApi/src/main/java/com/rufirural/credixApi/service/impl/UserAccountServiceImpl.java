package com.rufirural.credixApi.service.impl;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.rufirural.credixApi.dto.auth.AuthResponseDto;
import com.rufirural.credixApi.dto.auth.AuthRequestDto;
import com.rufirural.credixApi.entity.UserAccount;
import com.rufirural.credixApi.exception.ResourceNotFoundException;
import com.rufirural.credixApi.repository.UserAccountRepository;
import com.rufirural.credixApi.security.JwtUtil;
import com.rufirural.credixApi.service.UserAccountService;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserAccountServiceImpl implements UserAccountService {

    private final UserAccountRepository repository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public Optional<AuthResponseDto> findByEmail(String email) {
        UserAccount account = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        AuthResponseDto response = new AuthResponseDto(
                jwtUtil.generateToken(account.getEmail()),
                account.getId().longValue(), // Convertir Integer -> Long
                null, // userId si no existe en la entidad
                account.getEmail(),
                account.getPasswordHash(),
                account.getStatus()
        );

        return Optional.of(response);
    }

    @Override
    public String authenticate(AuthRequestDto loginDto) {
        UserAccount ua = repository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));

        if (!passwordEncoder.matches(loginDto.getPassword(), ua.getPasswordHash())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        return jwtUtil.generateToken(ua.getEmail());
    }
}
