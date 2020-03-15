package pl.nikowis.habits.dto;

import lombok.Data;

import javax.validation.constraints.Min;

@Data
public class UpdateUserDTO {

    @Min(1)
    private Integer streakGoal;
    private String password;

}
