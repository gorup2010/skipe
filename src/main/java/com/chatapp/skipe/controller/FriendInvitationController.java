package com.chatapp.skipe.controller;

import org.springframework.web.bind.annotation.RestController;

import com.chatapp.skipe.dto.FriendInvitationGetDto;
import com.chatapp.skipe.dto.FriendInvitationPostDto;
import com.chatapp.skipe.dto.NotificationDto;
import com.chatapp.skipe.dto.enumeration.NotificationType;
import com.chatapp.skipe.entity.FriendInvitation;
import com.chatapp.skipe.entity.User;
import com.chatapp.skipe.repository.FriendInvitationRepository;
import com.chatapp.skipe.repository.UserRepository;
import com.chatapp.skipe.service.FriendInvitationService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("friend-invitations")
@AllArgsConstructor
public class FriendInvitationController {

    SimpMessagingTemplate template;
    FriendInvitationService friendInvitationService;
    FriendInvitationRepository friendInvitationRepository;
    UserRepository userRepository;

    @GetMapping()
    public ResponseEntity<FriendInvitationGetDto> getFriendInvitation(
            @AuthenticationPrincipal User user) {
        List<FriendInvitation> sentInvitation = friendInvitationRepository.findAllBySenderOrderByCreatedAtDesc(user);
        List<FriendInvitation> receivedInvitation = friendInvitationRepository.findAllByReceiverOrderByCreatedAtDesc(user);
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
        template.convertAndSend("/queue/" + dto.userId(), new NotificationDto(NotificationType.NEW_FRIEND_INVITATION));
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("{invitationId}")
    public ResponseEntity<Void> deleteFriendInvitation(@PathVariable Integer invitationId) {
        friendInvitationRepository.delete(friendInvitationRepository.getReferenceById(invitationId));
        return ResponseEntity.noContent().build();
    }

    @PostMapping("{invitationId}/accept")
    public ResponseEntity<Void> acceptFriendInvitation(@PathVariable Integer invitationId) {
        User acceptedUser = friendInvitationService.acceptFriendInvitation(invitationId);
        template.convertAndSend("/queue/" + acceptedUser.getId(), new NotificationDto(NotificationType.NEW_FRIEND));
        return ResponseEntity.noContent().build();
    }
}