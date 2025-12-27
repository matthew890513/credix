// CreditRequestDto.java
package com.rufirural.credixApi.dto.credit;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CreditRequestDto {

    @NotNull
    @DecimalMin(value = "0.01", inclusive = true)
    private BigDecimal amount;

    @NotNull
    private LocalDate deliveryDate;

    @NotBlank
    @Pattern(regexp = "weekly|biweekly|monthly")
    private String paymentFrequency;

    @NotBlank
    @Pattern(regexp = "Paid|Pending")
    private String status;

    @NotNull
    private Long customerId;
}
