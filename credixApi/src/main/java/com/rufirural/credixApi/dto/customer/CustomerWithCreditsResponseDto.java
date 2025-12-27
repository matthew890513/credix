package com.rufirural.credixApi.dto.customer;

import com.rufirural.credixApi.dto.credit.CreditResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
public class CustomerWithCreditsResponseDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String middleName;
    private LocalDate birthDate;
    private BigDecimal monthlyIncome;

    private List<CreditResponseDto> credits; // lista de créditos asociados
}
