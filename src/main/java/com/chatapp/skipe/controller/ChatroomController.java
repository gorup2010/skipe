package com.chatapp.skipe.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Stack;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.chatapp.skipe.dto.ChatroomDto;
import com.chatapp.skipe.dto.ChatroomQueryResult;
import com.chatapp.skipe.entity.Message;
import com.chatapp.skipe.repository.ChatroomRepository;
import com.chatapp.skipe.repository.MessageRepository;


@Controller
@RequestMapping("chatrooms")
@AllArgsConstructor
public class ChatroomController {
    
    ChatroomRepository chatroomRepository;
    MessageRepository messageRepository;

    @GetMapping()
    public ResponseEntity<List<ChatroomDto>> getChatrooms(Principal principal) {
        List<ChatroomQueryResult> queryData = chatroomRepository.findAllChatroomAndLastMsg(principal.getName());

        LinkedList<ChatroomDto> dtos = new LinkedList<>();
        for (ChatroomQueryResult row : queryData) {
            if (dtos.isEmpty() || !dtos.getLast().id().equals(row.id())) {
                dtos.addLast(ChatroomDto.fromModel(row));
            }
            else {
                dtos.getLast().members().addLast(row.user());
            }
        }

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("{chatroomId}/messages")
    public ResponseEntity<List<Message>> getMessages(@PathVariable Integer chatroomId) {
        return ResponseEntity.ok(messageRepository.findByChatroom(chatroomId));
    }
}
