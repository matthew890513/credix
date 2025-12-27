package com.rufirural.credixApi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rufirural.credixApi.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
