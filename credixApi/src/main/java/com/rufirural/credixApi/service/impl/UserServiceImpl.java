package com.rufirural.credixApi.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import com.rufirural.credixApi.dto.user.UserRequestDto;
import com.rufirural.credixApi.dto.user.UserResponseDto;
import com.rufirural.credixApi.entity.User;
import com.rufirural.credixApi.exception.ResourceNotFoundException;
import com.rufirural.credixApi.repository.UserRepository;
import com.rufirural.credixApi.service.UserService;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;

    @Override
    public UserResponseDto create(UserRequestDto dto) {
        User u = new User();
        u.setFirstName(dto.getFirstName());
        u.setLastName(dto.getLastName());
        u.setMiddleName(dto.getMiddleName());
        u.setBirthDate(dto.getBirthDate());
        u.setHireDate(dto.getHireDate());

        repository.save(u);
        return map(u);
    }

    @Override
    public List<UserResponseDto> findAll() {
        return repository.findAll().stream().map(this::map).toList();
    }

    @Override
    public UserResponseDto findById(Long id) {
        User u = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return map(u);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    private UserResponseDto map(User u) {
        return new UserResponseDto(
                u.getId(),
                u.getFirstName(),
                u.getLastName(),
                u.getMiddleName(),
                u.getBirthDate(),
                u.getHireDate()
        );
    }
}
