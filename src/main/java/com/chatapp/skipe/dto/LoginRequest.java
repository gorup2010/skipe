package com.chatapp.skipe.dto;

import lombok.Builder;

@Builder
public record LoginRequest(
    String username,
    String password
) {
}
