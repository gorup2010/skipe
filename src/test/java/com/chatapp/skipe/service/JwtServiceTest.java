package com.chatapp.skipe.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertTrue;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.chatapp.skipe.entity.User;


@SpringBootTest(classes = { JwtService.class })
class JwtServiceTest {

    String token;
    JwtService jwtService;
    User user = User.builder().id(1).username("username").build();

    @Autowired
    JwtServiceTest(JwtService jwtService) { 
        this.jwtService = jwtService;
        this.token = this.jwtService.generateToken(user.getUsername());
    }

    @Test
    void testGenerateToken() {
        assertInstanceOf(String.class, token);
    }

    @Test
    void testValidateToken() {
        assertTrue(jwtService.validateToken(token, user));
    }

    @Test
    void testExtractUsername() {
        assertEquals(user.getUsername(), jwtService.extractUserName(token));
    }

}