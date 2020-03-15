package pl.nikowis.habits.exception;

public class HabitDoesntExistException extends BusinessException {

    public static final String ID_FIELD = "id";

    @Override
    public String getFieldName() {
        return ID_FIELD;
    }
}
