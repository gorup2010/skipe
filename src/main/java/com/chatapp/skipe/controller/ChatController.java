package com.chatapp.skipe.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.chatapp.skipe.service.MessageService;


@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final MessageService messageService;

    @MessageMapping("/chat")
    @SendTo("/topic/test")
    public String processMessage(@Payload String chatMessage) {
        // Add some delay
        try {
            Thread.sleep(1000);

        } catch (Exception e) {
            System.out.println("Error at chat");
        }

        // Save into database
        //messageService.save(chatMessage);

        // Return and broker will broadcast to all subscribers
        return "Hello";
    }
}
