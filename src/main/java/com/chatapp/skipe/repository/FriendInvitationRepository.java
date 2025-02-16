package com.chatapp.skipe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chatapp.skipe.entity.FriendInvitation;
import com.chatapp.skipe.entity.User;

public interface FriendInvitationRepository extends JpaRepository<FriendInvitation, Integer> {
    public List<FriendInvitation> findAllBySenderOrderByCreatedAtDesc(User sender);
    public List<FriendInvitation> findAllByReceiverOrderByCreatedAtDesc(User receiver);
}
