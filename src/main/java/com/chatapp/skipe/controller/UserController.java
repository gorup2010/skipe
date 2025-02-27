package com.chatapp.skipe.controller;

import org.springframework.web.bind.annotation.RestController;

import com.chatapp.skipe.dto.FriendDto;
import com.chatapp.skipe.dto.UserDto;
import com.chatapp.skipe.entity.User;
import com.chatapp.skipe.repository.UserRepository;

import lombok.AllArgsConstructor;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("users")
@AllArgsConstructor
public class UserController {

    UserRepository userRepository;

    @GetMapping()
    public ResponseEntity<List<UserDto>> search(@RequestParam String username, Principal principal) {
        List<UserDto> res = userRepository.findOtherUserByUsername(username, principal.getName());
        return ResponseEntity.ok(res);
    }

    @GetMapping("/myself/friends")
    public ResponseEntity<List<FriendDto>> getFriends(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userRepository.findFriendsOfUser(user.getId()));
    }
}
