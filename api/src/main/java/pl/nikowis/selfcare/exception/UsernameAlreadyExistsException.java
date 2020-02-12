package pl.nikowis.selfcare.exception;

public class UsernameAlreadyExistsException extends BusinessException {
    public UsernameAlreadyExistsException(Object[] args) {
        super(args);
    }
}
