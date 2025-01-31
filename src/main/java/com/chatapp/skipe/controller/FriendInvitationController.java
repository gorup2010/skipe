package com.chatapp.skipe.controller;

import org.springframework.web.bind.annotation.RestController;

import com.chatapp.skipe.dto.FriendInvitationDto;
import com.chatapp.skipe.entity.FriendInvitation;
import com.chatapp.skipe.entity.User;
import com.chatapp.skipe.repository.FriendInvitationRepository;

import lombok.AllArgsConstructor;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("friend-invitations")
@AllArgsConstructor
public class FriendInvitationController {
    
    FriendInvitationRepository friendInvitationRepository;

    @GetMapping()
    public ResponseEntity<FriendInvitationDto> getFriendInvitation(@RequestParam String page, @AuthenticationPrincipal User user) {
        List<FriendInvitation> sentInvitation = friendInvitationRepository.findAllBySender(user);
        List<FriendInvitation> receivedInvitation = friendInvitationRepository.findAllByReceiver(user);
        FriendInvitationDto res = new FriendInvitationDto(sentInvitation, receivedInvitation);
        return ResponseEntity.ok(res);
    }

    @PostMapping()
    public ResponseEntity<Void> createFriendInvitation(@RequestParam Integer userId, Principal principal) {
        FriendInvitation invt = new FriendInvitation();
        friendInvitationRepository.save(invt);
        return ResponseEntity.noContent().build();
    }

    public void acceptFriendInvitation() {

    }
    
    
}
