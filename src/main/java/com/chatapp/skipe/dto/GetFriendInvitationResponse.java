package com.chatapp.skipe.dto;

import java.util.List;
import com.chatapp.skipe.entity.FriendInvitation;

public record GetFriendInvitationResponse(List<FriendInvitationDto> sender, List<FriendInvitationDto> receiver) {
    public GetFriendInvitationResponse(List<FriendInvitation> sender, List<FriendInvitation> receiver) {
        
    }
}
