package com.chatapp.skipe.dto;

public record RegisterRequest(
    String username,
    String password,
    String email
) {
}
