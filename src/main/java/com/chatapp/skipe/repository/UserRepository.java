package com.chatapp.skipe.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chatapp.skipe.entity.User;


public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findOneByUsername(String username);
}
