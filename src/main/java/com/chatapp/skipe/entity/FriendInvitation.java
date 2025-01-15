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
public class FriendInvitation {
    @Id
    Integer id;
    User sender;
    User receiver;
    ZonedDateTime createdAt;
}
