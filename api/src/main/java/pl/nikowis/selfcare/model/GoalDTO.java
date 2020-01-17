package pl.nikowis.selfcare.model;

import lombok.Data;

import java.util.Date;

@Data
public class GoalDTO {

    private Long id;
    private String title;
    private String description;
    private Date createdAt;
    private String createdBy;
    private boolean fulfilled;

    public GoalDTO() {
    }

    public GoalDTO(Goal goal) {
        id = goal.getId();
        title = goal.getTitle();
        description = goal.getDescription();
        createdAt = goal.getCreatedAt();
        createdBy = goal.getCreatedBy();
    }

    public GoalDTO(Goal goal, boolean fulfilled) {
        id = goal.getId();
        title = goal.getTitle();
        description = goal.getDescription();
        createdAt = goal.getCreatedAt();
        createdBy = goal.getCreatedBy();
        this.fulfilled = fulfilled;
    }
}
