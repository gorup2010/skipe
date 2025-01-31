package com.chatapp.skipe.dto;

// Information of the other users like friends, searched users,...
public record UserDto(
    Integer id,
    String username,
    String avatar
) {
}
