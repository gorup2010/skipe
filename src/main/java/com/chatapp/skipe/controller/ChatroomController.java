package com.chatapp.skipe.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.chatapp.skipe.dto.ChatroomDto;
import com.chatapp.skipe.repository.ChatroomRepository;


@Controller
@RequestMapping("chatrooms")
@AllArgsConstructor
public class ChatroomController {
    
    ChatroomRepository chatroomRepository;

    @GetMapping()
    public ResponseEntity<List<ChatroomDto>> getChatrooms(Principal principal) {
        return ResponseEntity.ok(chatroomRepository.findAllChatroomAndLastMsg(principal.getName()));
    }
}
