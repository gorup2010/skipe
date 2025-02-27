package com.chatapp.skipe.entity;

import java.time.ZonedDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Builder.Default;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    Integer chatroom;
    Integer sender;
    String senderName;
    String content;
    @CreationTimestamp(source = SourceType.DB)
    @Column(insertable = false)
    ZonedDateTime createdAt;
    @Default
    Boolean isDeleted = false;
}
