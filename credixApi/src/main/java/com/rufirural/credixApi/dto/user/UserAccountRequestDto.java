// UserAccountRequestDto.java
package com.rufirural.credixApi.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import lombok.Data;

@Data
public class UserAccountRequestDto {

    @NotNull
    private Long userId;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;  // luego se encripta con BCrypt

    @Pattern(regexp = "Active|Inactive|Blocked")
    private String status;
}
