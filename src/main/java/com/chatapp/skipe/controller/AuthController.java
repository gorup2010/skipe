package com.chatapp.skipe.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class AuthController {
    
    @PostMapping("/login")
    public String getMethodName(@RequestParam String param) {
        return "Hello world";
    }
    
}
