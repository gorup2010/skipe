package com.chatapp.skipe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chatapp.skipe.entity.FriendInvitation;
import com.chatapp.skipe.entity.User;

public interface FriendInvitationRepository extends JpaRepository<FriendInvitation, Integer> {
    public List<FriendInvitation> findAllBySender(User sender);
    public List<FriendInvitation> findAllByReceiver(User receiver);
}
