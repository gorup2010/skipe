package com.chatapp.skipe.dto;

import java.time.ZonedDateTime;

public record ChatroomQueryResult(
    Integer id,
    String name,
    String avatar,
    Boolean isGroupChat,
    String lastMsg,
    ZonedDateTime lastModifyAt,
    String lastModifyUser,
    UserDto user
) {

}
