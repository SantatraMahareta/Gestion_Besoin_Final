package com.example.besoinEssai.controller;

import com.example.besoinEssai.model.Commentaire;
import com.example.besoinEssai.model.Message;
import com.example.besoinEssai.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/message")
public class MessageController {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }
    @PostMapping("/ajout/{email}")
    public ResponseEntity<Message> ajoutMessage(@PathVariable String email,@RequestBody Message nouveaumessage){
        Message message = messageService.ajoutMessage(email,nouveaumessage);
        return ResponseEntity.ok(message);
    }
    @GetMapping("/lister/{email}")
    public ResponseEntity<List<Message>> listerMessage(@PathVariable String email){
        List<Message> message = messageService.listeMessage(email);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/listerMessageNonLu/{email}")
    public ResponseEntity<List<Message>> listerMessNonLu(@PathVariable String email){
        List<Message> messages = messageService.listeMessageNonLu(email);
        return ResponseEntity.ok(messages);
    }
    @PutMapping("/lu/{messageId}")
    public ResponseEntity<Message> marquerCommeLu(@PathVariable Long messageId){
        Message message = messageService.messageMarquerLu(messageId);
        return ResponseEntity.ok(message);
    }
}
