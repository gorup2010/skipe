package com.chatapp.skipe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chatapp.skipe.entity.User;


public interface UserRepository extends JpaRepository<User, Integer> {
    User findOneByUsername(String username);
}
