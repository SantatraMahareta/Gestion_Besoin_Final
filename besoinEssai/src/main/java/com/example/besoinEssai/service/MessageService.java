package com.example.besoinEssai.service;

import com.example.besoinEssai.model.Message;
import com.example.besoinEssai.model.Utilisateur;
import com.example.besoinEssai.repository.MessageRepository;
import com.example.besoinEssai.repository.UtilisateurRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    private final UtilisateurRepository utilisateurRepository;

    public MessageService(MessageRepository messageRepository, UtilisateurRepository utilisateurRepository) {
        this.messageRepository = messageRepository;
        this.utilisateurRepository = utilisateurRepository;
    }
    // Méthodes pour ajouter un message
    public Message ajoutMessage(String email, Message message) {
        message.setUtilisateurEmetteur(email);
        message.setEstLu(false);
        Utilisateur utilisateurDestinataire = message.getUtilisateurDestinataire();
        Optional<Utilisateur> utilisateurDestinataireExistant = utilisateurRepository.findByEmail(utilisateurDestinataire.getEmail());

        if (utilisateurDestinataireExistant.isPresent()) {
            message.setUtilisateurDestinataire(utilisateurDestinataireExistant.get());
            return messageRepository.save(message);
        } else {
            throw new IllegalArgumentException("L'utilisateur destinataire spécifié n'existe pas.");
        }
    }

    //methode pour lister les messages non lu
    public List<Message> listeMessageNonLu(String email){
        List<Message> messages = messageRepository.findMessageByemail(email);
        return messages;
    }
    public List<Message> listeMessage(String email){
        Optional<Utilisateur> utilisateur = utilisateurRepository.findByEmail(email);
        List<Message> message = messageRepository.findByUtilisateurDestinataire(utilisateur);
        return message;
    }



    public Message messageMarquerLu(Long messageId){
        Message message = messageRepository.findByMessageId(messageId);
        message.setEstLu(Boolean.parseBoolean("true"));
        return messageRepository.save(message);
    }

//    public
}
