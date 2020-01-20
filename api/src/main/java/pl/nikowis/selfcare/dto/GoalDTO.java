package pl.nikowis.selfcare.dto;

import lombok.Data;
import pl.nikowis.selfcare.model.Goal;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
public class GoalDTO {

    private Long id;
    @NotEmpty
    private String title;
    @NotEmpty
    private String description;
    private Date createdAt;
    private boolean fulfilled;

    public GoalDTO() {
    }

    public GoalDTO(Goal goal) {
        id = goal.getId();
        title = goal.getTitle();
        description = goal.getDescription();
        createdAt = goal.getCreatedAt();
    }

    public GoalDTO(Goal goal, boolean fulfilled) {
        id = goal.getId();
        title = goal.getTitle();
        description = goal.getDescription();
        createdAt = goal.getCreatedAt();
        this.fulfilled = fulfilled;
    }
}
