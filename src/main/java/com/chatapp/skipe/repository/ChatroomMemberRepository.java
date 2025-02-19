package com.chatapp.skipe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chatapp.skipe.entity.ChatroomMember;

public interface ChatroomMemberRepository extends JpaRepository<ChatroomMember, Integer> {
    
}
