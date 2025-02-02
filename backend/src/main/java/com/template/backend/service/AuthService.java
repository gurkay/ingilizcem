package com.template.backend.service;

import com.template.backend.exceptions.CustomRoleNotFoundException;
import com.template.backend.entities.ERole;
import com.template.backend.entities.Role;
import com.template.backend.entities.User;
import com.template.backend.payload.request.LoginRequest;
import com.template.backend.payload.request.SignupRequest;
import com.template.backend.repository.RoleRepository;
import com.template.backend.repository.UserRepository;
import com.template.backend.security.jwt.JwtUtils;
import com.template.backend.security.services.UserDetailsImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder encoder,
            JwtUtils jwtUtils,
            AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
    }

    public String authenticate(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtUtils.generateJwtToken(authentication);
    }

    public UserDetailsImpl getUserDetails(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));
        return UserDetailsImpl.build(user);
    }

    public void validateSignupRequest(SignupRequest signUpRequest) {

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new Error("Error: Email is already in use!");
        }
    }

    // Get User by email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));
    }

    public static boolean isBlank(String str) {
        return str == null || str.isEmpty() || str.trim().isEmpty();
    }

    public User createNewUser(SignupRequest signUpRequest) {
        // Validate input data
        if (isBlank(signUpRequest.getEmail())) {
            throw new IllegalArgumentException("Username cannot be empty");
        }

        validateSignupRequest(signUpRequest);

        User user = new User(
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<Role> roles = new HashSet<>();
        if (signUpRequest.getRole() != null && !signUpRequest.getRole().isEmpty()) {
            roles = signUpRequest.getRole().stream()
                    .map(roleName -> {
                        ERole roleEnum = ERole.valueOf("ROLE_" + roleName.toUpperCase());
                        return roleRepository.findByName(roleEnum)
                                .orElseThrow(() -> new CustomRoleNotFoundException("Role not found: " + roleName));
                    })
                    .collect(Collectors.toSet());
        } else {
            Role defaultRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new CustomRoleNotFoundException("Default role not found"));
            roles.add(defaultRole);
        }

        user.setRoles(roles);
        return userRepository.save(user);
    }
}
