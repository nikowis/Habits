package pl.nikowis.habits.exception;

public class HabitAlreadyFulfiledException extends BusinessException {

    @Override
    public String getFieldName() {
        return "id";
    }
}
