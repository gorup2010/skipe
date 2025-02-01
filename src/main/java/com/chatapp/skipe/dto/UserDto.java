package com.chatapp.skipe.dto;

import com.chatapp.skipe.entity.User;

// Information of the other users like friends, searched users,...
public record UserDto(
    Integer id,
    String username,
    String avatar
) {
    public static UserDto fromModel(User user) {
        return new UserDto(user.getId(), user.getUsername(), user.getAvatar());
    }
}
