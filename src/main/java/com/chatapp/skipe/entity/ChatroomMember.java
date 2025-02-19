package com.chatapp.skipe.entity;

import java.time.ZonedDateTime;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.val;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatroomMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    Integer user;
    Integer chatroom;
    @Builder.Default
    Boolean isInChatroom = false;
    @Builder.Default
    Boolean isRead = false;
    @Column(insertable = false, updatable = false)
    ZonedDateTime attendedAt;
}
