package com.chatapp.skipe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import com.chatapp.skipe.dto.ChatroomDto;
import com.chatapp.skipe.entity.Chatroom;

public interface ChatroomRepository extends JpaRepository<Chatroom, Integer> {
    @Query("""
            with chatroomdto as (
            	SELECT cr.id as id, cr.name as name, cr.avatar as avatar, cr.isGroupChat as isGroupChat, msg.content as lastMsg, msg.createdAt as lastModifyAt, 
                    msg.senderName as lastModifyUser, row_number() over(partition by cr.id order by msg.createdAt desc) as number
            	FROM User u
            	left join ChatroomMember crm on u.id = crm.user
            	left join Chatroom cr on crm.chatroom = cr.id
            	left join Message msg on cr.id = msg.chatroom
            	where u.username = :username
            	order by cr.id, msg.createdAt
            )
            select new com.chatapp.skipe.dto.ChatroomDto(id, name, avatar, isGroupChat, lastMsg, lastModifyAt, lastModifyUser)
            from chatroomdto
            where number = 1
     """)
    List<ChatroomDto> findAllChatroomAndLastMsg(@Param("username") String username);
}
