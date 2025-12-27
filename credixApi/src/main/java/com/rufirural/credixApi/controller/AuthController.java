package com.rufirural.credixApi.controller;

import com.rufirural.credixApi.dto.auth.AuthRequestDto;
import com.rufirural.credixApi.dto.auth.AuthResponseDto;
import com.rufirural.credixApi.service.UserAccountService;
import com.rufirural.credixApi.security.JwtUtil;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtUtil jwtUtil;
    private final UserAccountService userAccountService;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthController(JwtUtil jwtUtil, UserAccountService userAccountService) {
        this.jwtUtil = jwtUtil;
        this.userAccountService = userAccountService;
        this.passwordEncoder = new BCryptPasswordEncoder(); // Para verificar hash de contraseña
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@Valid @RequestBody AuthRequestDto request) {

        // Buscar usuario por email
        AuthResponseDto account = userAccountService.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario o contraseña inválidos"));

        // Verificar contraseña (asumiendo que tu DTO tiene el hash de contraseña)
        if (!passwordEncoder.matches(request.getPassword(), account.getPassword())) {
            throw new RuntimeException("Usuario o contraseña inválidos");
        }

        // Generar token JWT
        String token = jwtUtil.generateToken(account.getEmail());

        // Retornar DTO con token y datos
        AuthResponseDto response = new AuthResponseDto(
                token,
                account.getId(),
                account.getUserId(),
                account.getEmail(),
                account.getPassword(),
                account.getStatus()
        );

        return ResponseEntity.ok(response);
    }
}
