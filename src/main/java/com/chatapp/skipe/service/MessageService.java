package com.chatapp.skipe.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.chatapp.skipe.entity.Message;
import com.chatapp.skipe.repository.MessageRepository;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository repository;

    public Message save(Message chatMessage) {
        // Save message into database
        repository.save(chatMessage);
        return chatMessage;
    }
}
