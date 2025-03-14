package com.chatapp.skipe.controller;

import java.util.Arrays;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.chatapp.skipe.SkipeApplication;
import com.chatapp.skipe.configuration.JwtAuthFilter;
import com.chatapp.skipe.dto.ChatroomQueryResult;
import com.chatapp.skipe.dto.UserDto;
import com.chatapp.skipe.entity.Message;
import com.chatapp.skipe.repository.ChatroomRepository;
import com.chatapp.skipe.repository.MessageRepository;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.time.ZonedDateTime;


@WebMvcTest(controllers = ChatroomController.class, excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = JwtAuthFilter.class))
@ContextConfiguration(classes =SkipeApplication.class)
@WithMockUser(username = "user1")
class ChatroomControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockitoBean
    ChatroomRepository chatroomRepository;

    @MockitoBean
    MessageRepository messageRepository;

    private final ZonedDateTime testTime = ZonedDateTime.now();
    private final UserDto user2 = new UserDto(2, "user2", "");
    private final UserDto user3 = new UserDto(3, "user3", "");
    private final UserDto user4 = new UserDto(4, "user4", "");

    @Test
    void testGetChatrooms_onlySingleChat() throws Exception {
        ChatroomQueryResult room1 = new ChatroomQueryResult(1, null, null, false, "Hello", testTime, "user1", user2);
        ChatroomQueryResult room2 = new ChatroomQueryResult(2, null, null, false, "Hi", testTime, "user2", user3);

        when(chatroomRepository.findAllChatroomAndLastMsg("user1")).thenReturn(Arrays.asList(room1, room2));

        mockMvc.perform(get("/chatrooms"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").isEmpty())
                .andExpect(jsonPath("$[0].isGroupChat").value(false))
                .andExpect(jsonPath("$[0].lastMsg").value("Hello"))
                .andExpect(jsonPath("$[0].lastModifyAt").exists())          // TODO: find way to verify date value
                .andExpect(jsonPath("$[0].members[0].id").value(2))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].name").isEmpty())
                .andExpect(jsonPath("$[1].isGroupChat").value(false))
                .andExpect(jsonPath("$[1].lastMsg").value("Hi"))
                .andExpect(jsonPath("$[1].lastModifyAt").exists())
                .andExpect(jsonPath("$[1].members[0].id").value(3));
    }

    @Test
    void testGetChatrooms_onlyGroupChat() throws Exception {
        ChatroomQueryResult member2 = new ChatroomQueryResult(1, null, null, true, "Hello", testTime, "user1", user2);
        ChatroomQueryResult member3 = new ChatroomQueryResult(1, null, null, true, "Hello", testTime, "user1", user3);

        when(chatroomRepository.findAllChatroomAndLastMsg("user1")).thenReturn(Arrays.asList(member2, member3));

        mockMvc.perform(get("/chatrooms"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").isEmpty())
                .andExpect(jsonPath("$[0].isGroupChat").value(true))
                .andExpect(jsonPath("$[0].lastMsg").value("Hello"))
                .andExpect(jsonPath("$[0].members").isArray())
                .andExpect(jsonPath("$[0].members", hasSize(2)))
                .andExpect(jsonPath("$[0].members[0].id").value(2));
    }

    @Test
    void testGetChatrooms_bothTypes() throws Exception {
        ChatroomQueryResult member2 = new ChatroomQueryResult(1, null, null, true, "Hello", testTime, "user1", user2);
        ChatroomQueryResult member3 = new ChatroomQueryResult(1, null, null, true, "Hello", testTime, "user1", user3);
        ChatroomQueryResult member4 = new ChatroomQueryResult(2, null, null, false, "Hello", testTime, "user1", user4);


        when(chatroomRepository.findAllChatroomAndLastMsg("user1")).thenReturn(Arrays.asList(member2, member3, member4));

        mockMvc.perform(get("/chatrooms"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].isGroupChat").value(true))
                .andExpect(jsonPath("$[0].members", hasSize(2)))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].isGroupChat").value(false));
    }

    @Test
    void testGetMessages() throws Exception {
        Message msg1 = new Message(1, 1, 1, "user1", "Hello", testTime, false);
        Message msg2 = new Message(2, 1, 1, "user1", "ABC", testTime, false);

        when(messageRepository.findByChatroom(1)).thenReturn(Arrays.asList(msg1, msg2));

        mockMvc.perform(get("/chatrooms/{chatroomId}/messages", 1))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].chatroom").value(1))
                .andExpect(jsonPath("$[0].content").value("Hello"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].chatroom").value(1))
                .andExpect(jsonPath("$[1].content").value("ABC"));
    }
}
