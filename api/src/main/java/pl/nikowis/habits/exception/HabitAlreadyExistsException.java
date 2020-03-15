package pl.nikowis.habits.exception;

public class HabitAlreadyExistsException extends BusinessException {

    @Override
    public String getFieldName() {
        return "title";
    }
}
