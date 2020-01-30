package pl.nikowis.selfcare.exception;

import lombok.Data;

@Data
public abstract class BusinessException extends RuntimeException {
    protected String message;

}
