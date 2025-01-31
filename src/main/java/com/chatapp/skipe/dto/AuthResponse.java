package com.chatapp.skipe.dto;

import lombok.Builder;

@Builder
public record AuthResponse(
    AccountDto user,
    String jwt
) {
}
