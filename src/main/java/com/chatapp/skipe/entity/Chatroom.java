package com.chatapp.skipe.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Chatroom {
    @Id
    Integer id;
    String name;
    String avatar;
    Boolean isGroupChat;
}
