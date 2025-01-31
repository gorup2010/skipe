package com.chatapp.skipe.controller;

import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("friends")
public class FriendController {
    
    @GetMapping()
    public void getFriends(@RequestBody String friend, Principal principal) {
        //TODO: Create friend invitation in database

        //TODO: Notify receiver
        
    }
}
