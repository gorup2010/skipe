package com.chatapp.skipe.entity;

import java.time.ZonedDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatroomMember {
    @Id
    Integer user;
    @Id
    Integer chatroom;
    Boolean isInChatroom;
    Boolean isRead;
    ZonedDateTime attendedAt;
}
