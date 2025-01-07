package com.chatapp.skipe.controller;

import org.springframework.web.bind.annotation.RestController;

import com.chatapp.skipe.dto.LoginRequest;
import com.chatapp.skipe.dto.RegisterRequest;
import com.chatapp.skipe.entity.User;
import com.chatapp.skipe.service.UserService;

import lombok.AllArgsConstructor;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@AllArgsConstructor
public class AuthController {
    
    private UserService userService;

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return userService.verify(request);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest request) throws Exception {
        return ResponseEntity.ok(userService.register(request));
    }

    @GetMapping("/test")
    public String test(Principal principal) {
        return principal.toString();
    }
    
}
