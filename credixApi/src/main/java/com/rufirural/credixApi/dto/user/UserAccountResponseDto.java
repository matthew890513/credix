// UserAccountResponseDto.java
package com.rufirural.credixApi.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserAccountResponseDto {

    private Long id;
    private Long userId;
    private String email;
    private String status;
}
