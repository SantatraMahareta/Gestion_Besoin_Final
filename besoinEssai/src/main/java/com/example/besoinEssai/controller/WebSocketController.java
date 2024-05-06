package com.example.besoinEssai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
    @Autowired
    private BesoinController besoinController;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public String processMessage(String message) {
        return "Message from server: " + message;
    }

//    @MessageMapping()
}

