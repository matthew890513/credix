package com.rufirural.credixApi.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthRequestDto {

        @NotBlank(message = "Username is required")
        String email;

        @NotBlank(message = "Password is required")
        String password;
}
