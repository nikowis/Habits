package pl.nikowis.selfcare.dto;

import lombok.Data;

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

}
