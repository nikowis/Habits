package pl.nikowis.selfcare.dto;

import lombok.Data;
import pl.nikowis.selfcare.model.Goal;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
public class FulfilableGoalDTO extends GoalDTO {

    private boolean fulfilled;

    public FulfilableGoalDTO(Goal goal) {
        super(goal);
    }

    public FulfilableGoalDTO(Goal goal, boolean fulfilled) {
        super(goal);
        this.fulfilled = fulfilled;
    }
}
