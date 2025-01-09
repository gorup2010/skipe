package com.chatapp.skipe.exception;

public class ForbiddenException extends RuntimeException {
    private String message;

    public ForbiddenException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
