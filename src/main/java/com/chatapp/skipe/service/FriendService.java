package com.chatapp.skipe.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import com.chatapp.skipe.dto.UserDto;
import com.chatapp.skipe.entity.Friend;
import com.chatapp.skipe.entity.User;
import com.chatapp.skipe.repository.FriendRepository;
import com.chatapp.skipe.repository.UserRepository;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class FriendService {
    FriendRepository friendRepository;
    UserRepository userRepository;

    public List<UserDto> getFriends(User user) {
        // Need to fetch again to fix LazyInitializationException: 
        // failed to lazily initialize a collection of roles, could not initialize proxy - no Session
        User u = userRepository.findById(user.getId()).get();

        List<UserDto> friends = u.getFriends().stream()
            .sorted((f1, f2) -> f2.getCreatedAt().compareTo(f1.getCreatedAt()))     // Sort in descending order of createdAt
            .map(friend -> UserDto.fromModel(friend.getFriend()))
            .toList();

        return friends;
    }
}
