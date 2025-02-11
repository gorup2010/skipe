package com.chatapp.skipe.service;

import org.springframework.stereotype.Service;

import com.chatapp.skipe.entity.Friend;
import com.chatapp.skipe.entity.FriendInvitation;
import com.chatapp.skipe.entity.User;
import com.chatapp.skipe.repository.FriendInvitationRepository;
import com.chatapp.skipe.repository.FriendRepository;
import com.chatapp.skipe.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class FriendInvitationService {

    FriendInvitationRepository friendInvitationRepository;
    FriendRepository friendRepository;
    UserRepository userRepository;

    // Return the accepted user
    @Transactional
    public User acceptFriendInvitation(Integer invitationId) {
        FriendInvitation invt = friendInvitationRepository.getReferenceById(invitationId);

        // Delete friend invitation
        friendInvitationRepository.delete(invt);

        // Create 2 friend entity. One is for the user accepting and another is for the user accepted
        User accepting = userRepository.getReferenceById(invt.getSender().getId());
        User accepted = userRepository.getReferenceById(invt.getReceiver().getId());
        Friend f_accepting = new Friend();
        f_accepting.setUser(accepting);
        f_accepting.setFriend(accepted);

        Friend f_accepted = new Friend();
        f_accepted.setUser(accepted);
        f_accepted.setFriend(accepting);

        friendRepository.save(f_accepting);
        friendRepository.save(f_accepted);

        return accepted;
    }
}
