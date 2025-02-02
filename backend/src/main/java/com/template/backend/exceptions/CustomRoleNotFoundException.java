package com.template.backend.exceptions;

public class CustomRoleNotFoundException extends RuntimeException {
    public CustomRoleNotFoundException(String message) {
        super(message);
    }
}
