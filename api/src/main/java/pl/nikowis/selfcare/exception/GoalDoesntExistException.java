package pl.nikowis.selfcare.exception;

public class GoalDoesntExistException extends BusinessException {

    public static final String ID_FIELD = "id";

    @Override
    public String getFieldName() {
        return ID_FIELD;
    }
}
