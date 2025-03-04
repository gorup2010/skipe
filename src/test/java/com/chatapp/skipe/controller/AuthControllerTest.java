package com.chatapp.skipe.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.chatapp.skipe.dto.AccountDto;
import com.chatapp.skipe.dto.AuthResponse;
import com.chatapp.skipe.dto.LoginRequest;
import com.chatapp.skipe.dto.RegisterRequest;
import com.chatapp.skipe.entity.User;
import com.chatapp.skipe.service.UserService;

import com.fasterxml.jackson.databind.ObjectMapper;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockitoBean
    UserService userService;

    @Test
    void testGetEndpoint() throws Exception {
        mockMvc.perform(get("/test"))
                .andExpect(status().isOk())
                .andExpect(content().string("Hello"));
    }

    @Test
    void testLogin() throws Exception {
        LoginRequest req = new LoginRequest("testuser1", "123456789");
        AuthResponse res = new AuthResponse(new AccountDto(1, "testuser1", "email", "avatar"), "token");

        when(userService.verify(req)).thenReturn(res);

        mockMvc.perform(
                post("/login").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user.id").value(1))
                .andExpect(jsonPath("$.user.username").value("testuser1"))
                .andExpect(jsonPath("$.user.email").value("email"))
                .andExpect(jsonPath("$.user.avatar").value("avatar"))
                .andExpect(jsonPath("$.jwt").value("token"));
    }

    @Test
    void testRegister() throws Exception {
        RegisterRequest req = new RegisterRequest("testuser1", "123456789", "email");
        User user = User.builder().id(1).username("testuser1").email("email").password("password").avatar("avatar")
                .build();

        when(userService.register(req)).thenReturn(user);

        mockMvc.perform(
                post("/register").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.username").value("testuser1"))
                .andExpect(jsonPath("$.email").value("email"))
                .andExpect(jsonPath("$.password").value("password"))
                .andExpect(jsonPath("$.avatar").value("avatar"))
                .andExpect(jsonPath("$.friends").isArray())
                .andExpect(jsonPath("$.friends", hasSize(0)));
    }
}
