package com.chatapp.skipe.controller;

import org.springframework.web.bind.annotation.RestController;

import com.chatapp.skipe.dto.UserDto;
import com.chatapp.skipe.repository.UserRepository;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
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

}
