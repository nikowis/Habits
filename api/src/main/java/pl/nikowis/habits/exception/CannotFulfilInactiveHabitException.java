package pl.nikowis.habits.exception;

public class CannotFulfilInactiveHabitException extends BusinessException {

    public static final String ACTIVE_FIELD = "active";

    @Override
    public String getFieldName() {
        return ACTIVE_FIELD;
    }
}
