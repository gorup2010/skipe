package com.chatapp.skipe.entity;

import java.time.ZonedDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    Integer id;
    Integer chatroom;
    Integer sender;
    String content;
    ZonedDateTime createdAt;
    Boolean isDeleted;
}
