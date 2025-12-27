package com.rufirural.credixApi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.rufirural.credixApi.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
