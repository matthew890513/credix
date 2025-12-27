// CreditResponseDto.java
package com.rufirural.credixApi.dto.credit;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreditResponseDto {

    private Long id;
    private BigDecimal amount;
    private LocalDate deliveryDate;
    private String paymentFrequency;
    private String status;
    private Long customerId;
}
