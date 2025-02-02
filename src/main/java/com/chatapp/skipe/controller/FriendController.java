package com.chatapp.skipe.controller;

import org.springframework.web.bind.annotation.RestController;

import com.chatapp.skipe.dto.UserDto;
import com.chatapp.skipe.entity.User;
import com.chatapp.skipe.repository.FriendRepository;

import lombok.AllArgsConstructor;

import java.security.Principal;
import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("friends")
@AllArgsConstructor
public class FriendController {
    
    FriendRepository friendRepository;

    // @GetMapping()
    // public ResponseEntity<List<UserDto>> getFriends(@AuthenticationPrincipal User user) {
        
    // }
    
}
