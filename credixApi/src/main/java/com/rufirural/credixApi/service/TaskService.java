package com.rufirural.credixApi.service;

import java.util.List;

import com.rufirural.credixApi.dto.task.TaskRequestDto;
import com.rufirural.credixApi.dto.task.TaskResponseDto;

public interface TaskService {

    TaskResponseDto create(TaskRequestDto dto);

    List<TaskResponseDto> findAll();

    TaskResponseDto findById(Long id);

    void delete(Long id);
}
