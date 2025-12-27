package com.rufirural.credixApi.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserAccountWithUserDto {

    // Datos de la cuenta
    private Long id;          // user_account.id
    private String email;
    private String status;

    // Datos del usuario relacionado
    private Long userId;      // users.id
    private String firstName;
    private String lastName;
    private String middleName;   // opcional
    private String birthDate;    // opcional, puede ser LocalDate si quieres mapearlo directamente
    private String hireDate;     // opcional
}
