package com.chatapp.skipe.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
}
