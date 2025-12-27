// CustomerResponseDto.java
package com.rufirural.credixApi.dto.customer;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class CustomerResponseDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String middleName;
    private LocalDate birthDate;
    private BigDecimal monthlyIncome;
}
