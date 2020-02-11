package pl.nikowis.selfcare.dto;

import lombok.Data;
import pl.nikowis.selfcare.model.Goal;

@Data
public class FulfilableGoalDTO extends GoalDTO {

    private boolean fulfilled;

    public FulfilableGoalDTO() {
    }

    public FulfilableGoalDTO(boolean fulfilled) {
        this.fulfilled = fulfilled;
    }
}
