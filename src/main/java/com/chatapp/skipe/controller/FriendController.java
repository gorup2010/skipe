package com.chatapp.skipe.controller;

import org.springframework.web.bind.annotation.RestController;

import com.chatapp.skipe.dto.UserDto;
import com.chatapp.skipe.entity.User;
import com.chatapp.skipe.repository.FriendRepository;
import com.chatapp.skipe.service.FriendService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("friends")
@AllArgsConstructor
public class FriendController {

    FriendRepository friendRepository;
    FriendService friendService;

    @GetMapping()
    public ResponseEntity<List<UserDto>> getFriends(@AuthenticationPrincipal User user) {
        List<UserDto> res = friendService.getFriends(user);
        return ResponseEntity.ok(res);
    }
}
