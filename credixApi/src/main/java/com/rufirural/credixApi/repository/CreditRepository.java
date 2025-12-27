package com.rufirural.credixApi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.rufirural.credixApi.entity.Credit;

import java.util.List;

public interface CreditRepository extends JpaRepository<Credit, Long> {
    List<Credit> findByCustomerId(Long customerId);
}
