package pl.nikowis.selfcare.dto;

import lombok.Data;
import pl.nikowis.selfcare.model.Goal;

import javax.validation.constraints.NotEmpty;
import java.util.Date;

@Data
public class CreateGoalDTO {

    @NotEmpty
    protected String title;
    @NotEmpty
    protected String description;

}
