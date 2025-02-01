package com.chatapp.skipe.dto;

import java.time.ZonedDateTime;
import com.chatapp.skipe.entity.FriendInvitation;

public record FriendInvitationDto(
    Integer id,
    ZonedDateTime createdAt,
    UserDto sender,
    UserDto receiver
) {
    public static FriendInvitationDto fromModel(FriendInvitation invt) {
        UserDto sender = UserDto.fromModel(invt.getSender());
        UserDto receiver = UserDto.fromModel(invt.getReceiver());
        return new FriendInvitationDto(invt.getId(), invt.getCreatedAt(), sender, receiver);
    }
}
