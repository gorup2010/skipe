package com.chatapp.skipe.entity;

import jakarta.validation.constraints.Size;
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
    @Size(max = 255)
    String name;
    @Size(max = 255)
    String avatar;
    Boolean isGroupChat;
}
