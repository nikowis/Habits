package pl.nikowis.selfcare.exception;

public class CannotFulfilInactiveGoal extends BusinessException {

    public static final String ACTIVE_FIELD = "active";

    @Override
    public String getFieldName() {
        return ACTIVE_FIELD;
    }
}
