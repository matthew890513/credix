package com.rufirural.credixApi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.rufirural.credixApi.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
