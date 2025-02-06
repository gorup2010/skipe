package com.chatapp.skipe.controller;

import org.springframework.web.bind.annotation.RestController;

import com.chatapp.skipe.dto.FriendInvitationGetDto;
import com.chatapp.skipe.dto.FriendInvitationPostDto;
import com.chatapp.skipe.entity.FriendInvitation;
import com.chatapp.skipe.entity.User;
import com.chatapp.skipe.repository.FriendInvitationRepository;
import com.chatapp.skipe.repository.FriendRepository;
import com.chatapp.skipe.repository.UserRepository;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("friend-invitations")
@AllArgsConstructor
public class FriendInvitationController {

    FriendInvitationRepository friendInvitationRepository;
    UserRepository userRepository;

    @GetMapping()
    public ResponseEntity<FriendInvitationGetDto> getFriendInvitation(
            @AuthenticationPrincipal User user) {
        List<FriendInvitation> sentInvitation = friendInvitationRepository.findAllBySender(user);
        List<FriendInvitation> receivedInvitation = friendInvitationRepository.findAllByReceiver(user);
        FriendInvitationGetDto res = FriendInvitationGetDto.fromModel(sentInvitation, receivedInvitation);
        return ResponseEntity.ok(res);
    }

    @PostMapping()
    public ResponseEntity<Void> createFriendInvitation(@RequestBody FriendInvitationPostDto dto,
            @AuthenticationPrincipal User sender) {
        FriendInvitation invt = FriendInvitation.builder().sender(sender)
                .receiver(userRepository.getReferenceById(dto.userId()))
                .build();
        friendInvitationRepository.save(invt);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("{invitationId}")
    public ResponseEntity<Void> deleteFriendInvitation(@PathVariable Integer invitationId) {
        friendInvitationRepository.delete(friendInvitationRepository.getReferenceById(invitationId));
        return ResponseEntity.noContent().build();
    }

    @PostMapping("{invitationId}/accept")
    public ResponseEntity<Void> acceptFriendInvitation(@PathVariable Integer invitationId) {
       
        
        return ResponseEntity.noContent().build();
    }
    
}
