package com.chatapp.skipe.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;

import com.chatapp.skipe.SkipeApplication;
import com.chatapp.skipe.configuration.JwtAuthFilter;
import com.chatapp.skipe.dto.FriendInvitationPostDto;
import com.chatapp.skipe.dto.NotificationDto;
import com.chatapp.skipe.entity.FriendInvitation;
import com.chatapp.skipe.entity.User;
import com.chatapp.skipe.repository.FriendInvitationRepository;
import com.chatapp.skipe.repository.UserRepository;
import com.chatapp.skipe.service.FriendInvitationService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(controllers = FriendInvitationController.class, excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = JwtAuthFilter.class))
@ContextConfiguration(classes = SkipeApplication.class)
@WithMockUser(username = "user1")
public class FriendInvitationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    SimpMessagingTemplate template;

    @MockitoBean
    FriendInvitationService friendInvitationService;

    @MockitoBean
    FriendInvitationRepository friendInvitationRepository;

    @MockitoBean
    UserRepository userRepository;

    @Test
    void testGetFriendInvitations() throws Exception {
        User user = new User();
        user.setId(1);
        user.setUsername("user1");

        when(friendInvitationRepository.findAllBySenderOrderByCreatedAtDesc(user)).thenReturn(List.of());
        when(friendInvitationRepository.findAllByReceiverOrderByCreatedAtDesc(user)).thenReturn(List.of());

        mockMvc.perform(get("/friend-invitations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.sentInvt").isArray())
                .andExpect(jsonPath("$.receivedInvt").isArray());
    }

    @Test
    void testCreateFriendInvitation() throws Exception {
        FriendInvitationPostDto dto = new FriendInvitationPostDto(2);

        when(userRepository.getReferenceById(dto.userId())).thenReturn(new User());

        mockMvc.perform(post("/friend-invitations")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isNoContent());

        verify(friendInvitationRepository, times(1)).save(any(FriendInvitation.class));
        verify(template, times(1)).convertAndSend(eq("/queue/" + dto.userId()), any(NotificationDto.class));
    }

    @Test
    void testDeleteFriendInvitation() throws Exception {
        FriendInvitation friendInvitation = FriendInvitation.builder().id(1).build();

        when(friendInvitationRepository.getReferenceById(friendInvitation.getId())).thenReturn(friendInvitation);

        mockMvc.perform(delete("/friend-invitations/{invitationId}", friendInvitation.getId())
                    .with(csrf()))
                .andExpect(status().isNoContent());

        verify(friendInvitationRepository, times(1)).delete(friendInvitation);
    }

    @Test
    void testAcceptFriendInvitation() throws Exception {
        FriendInvitation friendInvitation = FriendInvitation.builder().id(1).build();
        User user = User.builder().id(1).build();

        when(friendInvitationService.acceptFriendInvitation(friendInvitation.getId())).thenReturn(user);

        mockMvc.perform(post("/friend-invitations/{invitationId}/accept", friendInvitation.getId())
                    .with(csrf()))
                .andExpect(status().isNoContent());

        verify(friendInvitationService, times(1)).acceptFriendInvitation(friendInvitation.getId());
        verify(template, times(1)).convertAndSend(eq("/queue/" + user.getId()), any(NotificationDto.class));
    }
}
