package com.rufirural.credixApi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.rufirural.credixApi.entity.UserAccount;

import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    Optional<UserAccount> findByEmail(String email);
}
