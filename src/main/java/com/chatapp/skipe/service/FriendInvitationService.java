package com.chatapp.skipe.service;

import org.springframework.stereotype.Service;

import com.chatapp.skipe.entity.Chatroom;
import com.chatapp.skipe.entity.ChatroomMember;
import com.chatapp.skipe.entity.Friend;
import com.chatapp.skipe.entity.FriendInvitation;
import com.chatapp.skipe.entity.User;
import com.chatapp.skipe.repository.ChatroomRepository;
import com.chatapp.skipe.repository.FriendInvitationRepository;
import com.chatapp.skipe.repository.FriendRepository;
import com.chatapp.skipe.repository.UserRepository;
import com.chatapp.skipe.repository.ChatroomMemberRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class FriendInvitationService {

    FriendInvitationRepository friendInvitationRepository;
    FriendRepository friendRepository;
    UserRepository userRepository;
    ChatroomRepository chatroomRepository;
    ChatroomMemberRepository chatroomMemberRepository;

    // Return the accepted user
    @Transactional
    public User acceptFriendInvitation(Integer invitationId) {
        FriendInvitation invt = friendInvitationRepository.getReferenceById(invitationId);

        friendInvitationRepository.delete(invt);

        // Create 2 friend entity. One is for the user accepting and another is for the
        // user accepted
        User accepting = userRepository.getReferenceById(invt.getReceiver().getId());
        User accepted = userRepository.getReferenceById(invt.getSender().getId());
        Friend f_accepting = new Friend();
        f_accepting.setUser(accepting);
        f_accepting.setFriend(accepted);

        Friend f_accepted = new Friend();
        f_accepted.setUser(accepted);
        f_accepted.setFriend(accepting);

        friendRepository.save(f_accepting);
        friendRepository.save(f_accepted);

        Chatroom chatroom = chatroomRepository.save(Chatroom.builder().isGroupChat(false).build());
        chatroomMemberRepository
                .save(ChatroomMember.builder().user(accepting.getId()).chatroom(chatroom.getId()).build());
        chatroomMemberRepository
                .save(ChatroomMember.builder().user(accepted.getId()).chatroom(chatroom.getId()).build());

        return accepted;
    }
}
