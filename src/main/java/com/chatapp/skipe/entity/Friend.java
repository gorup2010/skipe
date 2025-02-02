package com.chatapp.skipe.entity;

import java.time.ZonedDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Friend {
    @Id
    User user;

    @Id
    User friend;

    @Column(insertable = false, updatable = false)
    ZonedDateTime createdAt;
}
