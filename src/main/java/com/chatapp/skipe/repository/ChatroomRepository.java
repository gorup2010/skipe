package com.chatapp.skipe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import com.chatapp.skipe.dto.ChatroomQueryResult;
import com.chatapp.skipe.entity.Chatroom;

public interface ChatroomRepository extends JpaRepository<Chatroom, Integer> {
    @Query("""
            with lastmsg as (
            	SELECT cr.id as id, cr.name as name, cr.avatar as avatar, cr.isGroupChat as isGroupChat, msg.content as lastMsg, msg.createdAt as lastModifyAt, 
                    msg.senderName as lastModifyUser, row_number() over(partition by cr.id order by msg.createdAt desc) as number
            	FROM User u
            	left join ChatroomMember crm on u.id = crm.user
            	left join Chatroom cr on crm.chatroom = cr.id
            	left join Message msg on cr.id = msg.chatroom
            	where u.username = :username
            )
            select new com.chatapp.skipe.dto.ChatroomQueryResult(msg.id, msg.name, msg.avatar, msg.isGroupChat, msg.lastMsg, msg.lastModifyAt, msg.lastModifyUser, 
                                new com.chatapp.skipe.dto.UserDto(u.id , u.username, u.avatar))
            from lastmsg msg
            join ChatroomMember crm on msg.id = crm.chatroom
            join User u on crm.user = u.id
            where number = 1 and u.username != :username
            order by msg.lastModifyAt desc, msg.id
     """)
    List<ChatroomQueryResult> findAllChatroomAndLastMsg(@Param("username") String username);
}
