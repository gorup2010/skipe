package com.chatapp.skipe.dto;

import java.util.List;
import com.chatapp.skipe.entity.FriendInvitation;

public record FriendInvitationGetDto(List<FriendInvitationDto> sentInvt, List<FriendInvitationDto> receivedInvt) {
    static public FriendInvitationGetDto fromModel(List<FriendInvitation> sentInvt, List<FriendInvitation> receivedInvt) {
        List<FriendInvitationDto> sent = sentInvt.stream().map(FriendInvitationDto::fromModel).toList();
        List<FriendInvitationDto> received = receivedInvt.stream().map(FriendInvitationDto::fromModel).toList();
        return new FriendInvitationGetDto(sent, received);
    }
}
