package com.chatapp.skipe.dto;

import java.time.ZonedDateTime;
import java.util.LinkedList;

public record ChatroomDto(
        Integer id,
        String name,
        String avatar,
        Boolean isGroupChat,
        String lastMsg,
        ZonedDateTime lastModifyAt,
        String lastModifyUser,
        LinkedList<UserDto> members) {
    static public ChatroomDto fromModel(ChatroomQueryResult queryResult) {
        LinkedList<UserDto> members = new LinkedList<>();
        members.addLast(queryResult.user());
        return new ChatroomDto(queryResult.id(), queryResult.name(), queryResult.avatar(), queryResult.isGroupChat(),
                queryResult.lastMsg(), queryResult.lastModifyAt(), queryResult.lastModifyUser(),
                members);
    }
}
