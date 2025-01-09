package com.chatapp.skipe.dto;

import lombok.Builder;

@Builder
public record AuthResponse(
    UserDto user,
    String jwt
) {
}
