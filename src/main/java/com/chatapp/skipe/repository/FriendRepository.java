package com.chatapp.skipe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chatapp.skipe.entity.Friend;

public interface FriendRepository extends JpaRepository<Friend, Integer>  {
    
}
