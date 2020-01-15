package pl.nikowis.selfcare.model;

import lombok.Data;

import java.util.Date;

@Data
public class DailyGoalDTO {

    private Long id;
    private String title;
    private String description;
    private Date createdAt;
    private String createdBy;
    private boolean fulfilled;

    public DailyGoalDTO() {
    }

    public DailyGoalDTO(Goal goal) {
        id = goal.getId();
        title = goal.getTitle();
        description = goal.getDescription();
        createdAt = goal.getCreatedAt();
        createdBy = goal.getCreatedBy();
    }
}
