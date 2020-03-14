package pl.nikowis.selfcare.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class CreateGoalDTO {

    @NotBlank
    @Size(min = 2)
    protected String title;

    protected String description;

}
