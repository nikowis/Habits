package pl.nikowis.habits.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import java.util.Date;

@Data
public class HabitDTO {

    protected Long id;
    @NotEmpty
    protected String title;
    @NotEmpty
    protected String description;
    protected Date createdAt;
    protected Boolean active;

}
