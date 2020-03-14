package pl.nikowis.habits.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class CreateHabitDTO {

    @NotBlank
    @Size(min = 2)
    protected String title;

    protected String description;

}
