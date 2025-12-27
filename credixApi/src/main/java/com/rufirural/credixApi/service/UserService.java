package com.rufirural.credixApi.service;

import java.util.List;
import com.rufirural.credixApi.dto.user.UserRequestDto;
import com.rufirural.credixApi.dto.user.UserResponseDto;

public interface UserService {
    UserResponseDto create(UserRequestDto dto);
    List<UserResponseDto> findAll();
    UserResponseDto findById(Long id);
    void delete(Long id);
}
