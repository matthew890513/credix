package com.rufirural.credixApi.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import com.rufirural.credixApi.dto.task.TaskRequestDto;
import com.rufirural.credixApi.dto.task.TaskResponseDto;
import com.rufirural.credixApi.entity.Task;
import com.rufirural.credixApi.exception.ResourceNotFoundException;
import com.rufirural.credixApi.repository.TaskRepository;
import com.rufirural.credixApi.service.TaskService;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository repository;

    @Override
    public TaskResponseDto create(TaskRequestDto dto) {
        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setCompleted(false);

        repository.save(task);
        return map(task);
    }

    @Override
    public List<TaskResponseDto> findAll() {
        return repository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public TaskResponseDto findById(Long id) {
        Task task = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        return map(task);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    private TaskResponseDto map(Task task) {
        return new TaskResponseDto(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.isCompleted()
        );
    }
}
