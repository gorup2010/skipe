package com.chatapp.skipe.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.chatapp.skipe.dto.LoginRequest;
import com.chatapp.skipe.dto.RegisterRequest;
import com.chatapp.skipe.entity.User;
import com.chatapp.skipe.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {

    private PasswordEncoder encoder;
    private UserRepository userRepository;
    private AuthenticationManager authenticationManager;

    private JwtService jwtService;

    public User register(RegisterRequest request) throws Exception {
        if (userRepository.findOneByUsername(request.username()).isPresent()) {
            throw new Exception();
        }
        String encryptedPassword = encoder.encode(request.password());

        User newUser = User.builder().email(request.email()).username(request.username()).password(encryptedPassword)
                .build();
        return userRepository.save(newUser);
    }

    public String verify(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password()));
        if (!authentication.isAuthenticated()) {
            return "Fail";
        }

        return jwtService.generateToken(request.username());
    }
}
