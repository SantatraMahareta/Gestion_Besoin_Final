package com.example.besoinEssai.controller;

import com.example.besoinEssai.model.MessageEmail;
import com.example.besoinEssai.service.mailing.impl.EnvoiEmailServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/email")
public class EmailController {
    @Autowired
    private EnvoiEmailServiceImpl emailService;
    @PostMapping("/envoiEmail/{email}")
    public ResponseEntity sendEmail(@PathVariable String email, @RequestBody MessageEmail messageEmail){
        this.emailService.envoiEmail(email,messageEmail.getTo(),messageEmail.getObjet(),messageEmail.getMessage());
        return ResponseEntity.ok("Succes");
    }
}
