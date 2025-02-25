package com.chatapp.skipe.controller;

import lombok.RequiredArgsConstructor;

import java.security.Principal;
import java.time.ZonedDateTime;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;

import com.chatapp.skipe.dto.SocketMessage;
import com.chatapp.skipe.entity.Message;
import com.chatapp.skipe.entity.User;
import com.chatapp.skipe.repository.MessageRepository;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final MessageRepository messageRepository;

    @MessageMapping("/chat/{chatroomId}")
    public Message processMessage(@Payload SocketMessage chatMessage, @DestinationVariable Integer chatroomId) {
        Message msg = messageRepository.save(Message.builder().sender(chatMessage.sender())
                .senderName(chatMessage.senderName()).chatroom(chatroomId).content(chatMessage.content()).build());
        return msg;
    }
}
