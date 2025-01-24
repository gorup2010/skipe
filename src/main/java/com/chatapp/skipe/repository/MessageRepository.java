package com.chatapp.skipe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chatapp.skipe.entity.Message;


public interface MessageRepository extends JpaRepository<Message, Integer> {
    List<Message> findByChatroom(Integer chatroom);
}
