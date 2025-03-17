package com.chatapp.skipe.service;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import com.chatapp.skipe.dto.RegisterRequest;
import com.chatapp.skipe.entity.User;
import com.chatapp.skipe.repository.UserRepository;

@SpringBootTest(classes = { UserService.class })
public class UserServiceTest {

    @Autowired
    UserService userService;

    @MockitoBean
    PasswordEncoder encoder;
    @MockitoBean
    UserRepository userRepository;
    @MockitoBean
    AuthenticationManager authenticationManager;
    @MockitoBean
    JwtService jwtService;

    @Test
    void testRegister_userDidntExist_returnsUser() throws Exception {
        RegisterRequest request = new RegisterRequest("testuser1", "password", "email");
        User user = User.builder().id(1).username("testuser1").email("email").password("encodedPassword")
                .avatar("avatar").build();

        when(encoder.encode("password")).thenReturn("encodedPassword");
        when(userRepository.findOneByUsername(anyString())).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenAnswer(new Answer<User>() {
            public User answer(InvocationOnMock invocation) throws Throwable {
                return (User) invocation.getArguments()[0];
            }
        });

        User actual = userService.register(request);

        assertEquals(user.getUsername(), actual.getUsername());
    }

    @Test
    void testRegister_userExists_throwException() throws Exception {
        RegisterRequest request = new RegisterRequest("testuser1", "password", "email");
        User user = User.builder().id(1).username("testuser1").email("email").password("encodedPassword")
                .avatar("avatar").build();

        when(encoder.encode("password")).thenReturn("encodedPassword");
        when(userRepository.findOneByUsername(anyString())).thenReturn(Optional.of(user));

        assertThrows(Exception.class, () -> userService.register(request));
    }

    @Test
    void testVerify() {
        
    }
}
