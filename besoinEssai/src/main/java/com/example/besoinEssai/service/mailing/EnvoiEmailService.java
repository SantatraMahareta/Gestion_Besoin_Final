package com.example.besoinEssai.service.mailing;

public interface EnvoiEmailService {
    void envoiEmail(String from,String to, String objet, String message);
}
