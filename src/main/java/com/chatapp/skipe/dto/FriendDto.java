package com.chatapp.skipe.dto;

public record FriendDto(
    Integer id,
    String username,
    String avatar,
    Integer chatroom
) {
}
