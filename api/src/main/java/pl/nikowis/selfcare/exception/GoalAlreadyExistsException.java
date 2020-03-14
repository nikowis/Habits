package pl.nikowis.selfcare.exception;

public class GoalAlreadyExistsException extends BusinessException {

    @Override
    public String getFieldName() {
        return "title";
    }
}
