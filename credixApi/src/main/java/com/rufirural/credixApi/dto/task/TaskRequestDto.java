package com.rufirural.credixApi.dto.task;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TaskRequestDto {

    @NotBlank
    private String title;

    private String description;
}
