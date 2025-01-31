package com.chatapp.skipe.dto;

import java.time.ZonedDateTime;

public record FriendInvitationDto(
    Integer id,
    ZonedDateTime createdAt,
    UserDto sender,
    UserDto receiver
) {
}
