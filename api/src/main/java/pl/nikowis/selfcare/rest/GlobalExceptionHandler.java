package pl.nikowis.selfcare.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import pl.nikowis.selfcare.exception.BusinessException;
import pl.nikowis.selfcare.model.ApiError;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Locale;

@ControllerAdvice
public class GlobalExceptionHandler implements AuthenticationFailureHandler {

    private final static Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @Autowired
    private MessageSource messageSource;

    @ExceptionHandler({BusinessException.class})
    public final ResponseEntity<ApiError> handleBusinessException(BusinessException ex, WebRequest request) {
        return getResponse(ex, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({DataIntegrityViolationException.class})
    public final ResponseEntity<ApiError> handleBusinessException(DataIntegrityViolationException ex, WebRequest request) {
        return getResponse(ex, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({AccessDeniedException.class})
    public final ResponseEntity<ApiError> handleBusinessException(AccessDeniedException ex, WebRequest request) {
        return getResponse(ex, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler({AuthenticationException.class})
    public final ResponseEntity<ApiError> handleBusinessException(AuthenticationException ex, WebRequest request) {
        return getResponse(ex, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler({Exception.class})
    public final ResponseEntity<ApiError> handleUnexpectedException(Exception ex, WebRequest request) {
        LOGGER.error("UNCAUGHT EXCEPTION", ex);
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<ApiError> getResponse(Exception ex, HttpStatus status) {
        LOGGER.warn("Exception handled ", ex);
        ApiError apiError = new ApiError();
        String exceptionName = ex.getClass().getSimpleName();
        apiError.setError(exceptionName);
        apiError.setMessage(messageSource.getMessage(exceptionName, null, Locale.getDefault()));
        return new ResponseEntity<>(apiError, status);
    }

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException ex) throws IOException {
        ApiError apiError = new ApiError();
        String exceptionName = ex.getClass().getSimpleName();
        apiError.setError(exceptionName);
        apiError.setMessage(messageSource.getMessage(exceptionName, null, Locale.getDefault()));
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON.toString());
        response.getWriter().write(new ObjectMapper().writeValueAsString(apiError));
    }
}
