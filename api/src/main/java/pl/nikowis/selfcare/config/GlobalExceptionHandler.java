package pl.nikowis.selfcare.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import pl.nikowis.selfcare.exception.BusinessException;
import pl.nikowis.selfcare.model.ApiError;
import pl.nikowis.selfcare.model.ApiErrorResponse;

import java.util.Collections;
import java.util.Locale;

@ControllerAdvice
public class GlobalExceptionHandler {

    private final static Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    public static final String GENERAL_FIELD = "general";

    @Autowired
    private MessageSource messageSource;

    @ExceptionHandler({DataIntegrityViolationException.class})
    public final ResponseEntity handleDatabaseException(Exception ex, WebRequest request) {
        return getResponse(ex, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({BusinessException.class})
    public final ResponseEntity handleBusinessException(BusinessException ex, WebRequest request) {
        return getResponse(ex, ex.getArgs(), HttpStatus.BAD_REQUEST, ex.getFieldName());
    }


    @ExceptionHandler({AccessDeniedException.class})
    public final ResponseEntity handleAccessDeniedException(AccessDeniedException ex, WebRequest request) {
        return getResponse(ex, HttpStatus.FORBIDDEN);
    }


    @ExceptionHandler({AuthenticationException.class})
    public final ResponseEntity handleAuthenticationException(AuthenticationException ex, WebRequest request) {
        return getResponse(ex, HttpStatus.UNAUTHORIZED);
    }

    private ResponseEntity getResponse(Exception ex, HttpStatus status) {
        return getResponse(ex, null, status, GENERAL_FIELD);
    }

    private ResponseEntity getResponse(Exception ex, Object[] args, HttpStatus status, String field) {
        LOGGER.warn("Exception handled ", ex);
        String exceptionName = ex.getClass().getSimpleName();
        ApiError apiError = new ApiError(field, messageSource.getMessage(exceptionName, args, LocaleContextHolder.getLocale()));
        ApiErrorResponse apiErrorResponse = new ApiErrorResponse(status, Collections.singletonList(apiError));
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE);
        return new ResponseEntity<>(apiErrorResponse, httpHeaders, status);
    }

}
