package com.chatapp.skipe.exception;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;

import com.chatapp.skipe.dto.ErrorResponse;

import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class ApiExceptionHandler {
    private static final String ERROR_LOG_FORMAT = "Error: URI: {}, ErrorCode: {}, Message: {}";

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex, WebRequest request) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        
        return buildErrorResponse(status, ex.getMessage(), null, ex, request, status.value());
    }

    private String getServletPath(WebRequest webRequest) {
        ServletWebRequest servletRequest = (ServletWebRequest) webRequest;
        return servletRequest.getRequest().getServletPath();
    }

    private ResponseEntity<ErrorResponse> buildErrorResponse(HttpStatus status, String message, List<String> errors,
            Exception ex, WebRequest request, int statusCode) {
        ErrorResponse errorResponse = new ErrorResponse(status.toString(), status.getReasonPhrase(), message, errors);

        if (request != null) {
            log.error(ERROR_LOG_FORMAT, this.getServletPath(request), statusCode, message);
        }
        log.error(message, ex);
        return ResponseEntity.status(status).body(errorResponse);
    }
}
