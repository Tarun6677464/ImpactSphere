package com.vms.service;

import com.vms.dto.auth.AuthResponse;
import com.vms.dto.auth.LoginRequest;
import com.vms.dto.auth.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
