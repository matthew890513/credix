package com.rufirural.credixApi.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponseDto{
        private String token;
        private Long id;
        private Long userId;
        private String email;
        private String password;
        private String status;
}
