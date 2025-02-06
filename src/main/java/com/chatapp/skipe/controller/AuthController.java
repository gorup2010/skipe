package com.chatapp.skipe.controller;

import org.springframework.web.bind.annotation.RestController;

import com.chatapp.skipe.dto.AuthResponse;
import com.chatapp.skipe.dto.LoginRequest;
import com.chatapp.skipe.dto.RegisterRequest;
import com.chatapp.skipe.dto.UserDto;
import com.chatapp.skipe.entity.User;
import com.chatapp.skipe.repository.FriendInvitationRepository;
import com.chatapp.skipe.service.UserService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@AllArgsConstructor
public class AuthController {

    private UserService userService;
    FriendInvitationRepository friendInvitationRepository;

    // Note that if authentication is fail, Spring return 403.
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(userService.verify(request));
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest request) throws Exception {
        return ResponseEntity.ok(userService.register(request));
    }

    @GetMapping("/test")
    public ResponseEntity<List<UserDto>> getFriendInvitation() {

        return ResponseEntity.ok(null);
    }

}
