package com.example.besoinEssai.controller;

import com.example.besoinEssai.model.Role;
import com.example.besoinEssai.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/role")
public class RoleController {
    private final RoleService roleService;
    @GetMapping("/listeRole/{email}")
    public ResponseEntity<Role> recupererRole(@PathVariable String email){
        Role role = roleService.recupererRole(email);
        return ResponseEntity.ok(role);
    }
}
