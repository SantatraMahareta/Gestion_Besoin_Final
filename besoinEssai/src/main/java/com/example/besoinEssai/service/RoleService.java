package com.example.besoinEssai.service;

import com.example.besoinEssai.model.Role;
import com.example.besoinEssai.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;
    public Role recupererRole(String email){
        Role role = roleRepository.findByemail(email);
        return role;
    }
}
