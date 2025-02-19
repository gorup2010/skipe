package com.chatapp.skipe.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.chatapp.skipe.dto.FriendDto;
import com.chatapp.skipe.dto.UserDto;
import com.chatapp.skipe.entity.User;


public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findOneByUsername(String username);
    
    @Query("""
        SELECT new com.chatapp.skipe.dto.UserDto(u.id, u.username, u.avatar) 
        FROM User u 
        WHERE u.username LIKE %:username% AND u.username != :requester
    """)
    List<UserDto> findOtherUserByUsername(@Param("username") String username, @Param("requester") String requester);

    @Query("""
        SELECT new com.chatapp.skipe.dto.FriendDto(u.id, u.username, u.avatar, crm.chatroom)
        FROM ChatroomMember crm
        left join User u on crm.user = u.id 
        where crm.user != :userId and crm.chatroom in (
            select c.id
            from ChatroomMember crm
            left join Chatroom c on crm.chatroom = c.id
            where c.isGroupChat = false
        )
    """)
    List<FriendDto> findFriendsOfUser(@Param("userId") Integer userId);
}
