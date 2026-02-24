package com.vms.dto.auth;

import com.vms.entity.Role;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthResponse {
    private final String token;
    private final Long userId;
    private final String fullName;
    private final String email;
    private final Role role;
}
