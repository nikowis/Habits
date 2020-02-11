package pl.nikowis.selfcare.dto;

import lombok.Data;
import pl.nikowis.selfcare.model.Goal;

import javax.validation.constraints.NotEmpty;
import java.util.Date;

@Data
public class GoalDTO {

    protected Long id;
    @NotEmpty
    protected String title;
    @NotEmpty
    protected String description;
    protected Date createdAt;
    protected Boolean active;

    public GoalDTO() {
    }

    public GoalDTO(Goal goal) {
        id = goal.getId();
        title = goal.getTitle();
        description = goal.getDescription();
        createdAt = goal.getCreatedAt();
        active = goal.getActive();
    }
}
