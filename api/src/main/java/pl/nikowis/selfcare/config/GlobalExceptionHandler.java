package pl.nikowis.selfcare.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import pl.nikowis.selfcare.exception.BusinessException;
import pl.nikowis.selfcare.model.ApiError;

import java.util.Locale;

@ControllerAdvice
public class GlobalExceptionHandler {

    private final static Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @Autowired
    private MessageSource messageSource;

    @ExceptionHandler({DataIntegrityViolationException.class})
    public final ResponseEntity handleDatabaseException(Exception ex, WebRequest request) {
        return getResponse(ex, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({BusinessException.class})
    public final ResponseEntity handleBusinessException(BusinessException ex, WebRequest request) {
        return getResponse(ex, ex.getArgs(), HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler({AccessDeniedException.class})
    public final ResponseEntity handleBusinessException(AccessDeniedException ex, WebRequest request) {
        return getResponse(ex, HttpStatus.FORBIDDEN);
    }


    @ExceptionHandler({AuthenticationException.class})
    public final ResponseEntity handleBusinessException(AuthenticationException ex, WebRequest request) {
        return getResponse(ex, HttpStatus.UNAUTHORIZED);
    }

    private ResponseEntity getResponse(Exception ex, HttpStatus status) {
        return getResponse(ex, null, status);
    }

    private ResponseEntity getResponse(Exception ex, Object[] args, HttpStatus status) {
        LOGGER.warn("Exception handled ", ex);
        ApiError apiError = new ApiError();
        String exceptionName = ex.getClass().getSimpleName();
        apiError.setError(exceptionName);
        apiError.setMessage(messageSource.getMessage(exceptionName, args, Locale.getDefault()));
        return new ResponseEntity<>(apiError, status);
    }

}
