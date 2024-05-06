package com.example.besoinEssai.service.mailing.impl;

import com.example.besoinEssai.service.mailing.EnvoiEmailService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Properties;


@Service
//@AllArgsConstructor
//@NoArgsConstructor(force = true)
public class EnvoiEmailServiceImpl implements EnvoiEmailService {
    @Autowired
    private JavaMailSender mailSender;
    @Override
    public void envoiEmail(String from, String to, String objet, String message) {

        Properties properties = new Properties();
        properties.put("mail.smtp.ssl.trust","*");
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(from);
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(objet);
        simpleMailMessage.setText(message);
//        simpleMailMessage.s

        this.mailSender.send(simpleMailMessage);
    }
}
