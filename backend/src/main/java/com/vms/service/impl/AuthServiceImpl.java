package com.vms.service.impl;

import com.vms.dto.auth.AuthResponse;
import com.vms.dto.auth.LoginRequest;
import com.vms.dto.auth.RegisterRequest;
import com.vms.entity.User;
import com.vms.exception.BadRequestException;
import com.vms.exception.UnauthorizedException;
import com.vms.repository.AuthRepository;
import com.vms.security.CustomUserDetailsService;
import com.vms.security.JwtService;
import com.vms.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AuthRepository authRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (authRepository.existsByEmail(request.getEmail())) throw new BadRequestException("Email already registered");
        User saved = authRepository.save(User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail().toLowerCase())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .enabled(true)
                .build());
        String token = jwtService.generateToken(userDetailsService.loadUserByUsername(saved.getEmail()));
        return AuthResponse.builder().token(token).userId(saved.getId()).fullName(saved.getFullName()).email(saved.getEmail()).role(saved.getRole()).build();
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (Exception ex) {
            throw new UnauthorizedException("Invalid credentials");
        }
        var user = authRepository.findByEmail(request.getEmail()).orElseThrow(() -> new UnauthorizedException("Invalid credentials"));
        String token = jwtService.generateToken(userDetailsService.loadUserByUsername(user.getEmail()));
        return AuthResponse.builder().token(token).userId(user.getId()).fullName(user.getFullName()).email(user.getEmail()).role(user.getRole()).build();
    }
}
