package com.chatapp.skipe.dto;

// Information of the users login to website
public record AccountDto(
    Integer id,
    String username,
    String email,
    String avatar
) {
}