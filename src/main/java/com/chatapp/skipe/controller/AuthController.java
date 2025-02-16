package com.chatapp.skipe.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.config.WebSocketMessageBrokerStats;

import com.chatapp.skipe.dto.AuthResponse;
import com.chatapp.skipe.dto.ChatroomDto;
import com.chatapp.skipe.dto.LoginRequest;
import com.chatapp.skipe.dto.NotificationDto;
import com.chatapp.skipe.dto.RegisterRequest;
import com.chatapp.skipe.dto.UserDto;
import com.chatapp.skipe.dto.enumeration.NotificationType;
import com.chatapp.skipe.entity.User;
import com.chatapp.skipe.repository.ChatroomRepository;
import com.chatapp.skipe.repository.FriendInvitationRepository;
import com.chatapp.skipe.repository.UserRepository;
import com.chatapp.skipe.service.FriendService;
import com.chatapp.skipe.service.UserService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@AllArgsConstructor
public class AuthController {

    private UserService userService;
    FriendInvitationRepository friendInvitationRepository;
    FriendService friendService;
    UserRepository userRepository;
    SimpMessagingTemplate template;
    ChatroomRepository chatroomRepository;

    // Note that if authentication is fail, Spring return 403.
    // Because currently the "error" endpoint isn't in the list in requestMatchers.
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(userService.verify(request));
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest request) throws Exception {
        return ResponseEntity.ok(userService.register(request));
    }

    @GetMapping("/test")
    public ResponseEntity<List<ChatroomDto>> getFriendInvitation() {
        return ResponseEntity.ok(chatroomRepository.findAllChatroomAndLastMsg("testuser1"));
    }

    // Whenever authentication fail, spring boot will redirect users to the "/error" endpoint with respective HTTP method with the request
    // @PostMapping("error")
    // public ResponseEntity<?> postMethodName(HttpServletRequest request) {
    //     return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    // }
}
