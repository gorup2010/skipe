package com.chatapp.skipe.dto;

public record SocketMessage(
    String content,
    Integer sender,
    String senderName
) {
    
}
