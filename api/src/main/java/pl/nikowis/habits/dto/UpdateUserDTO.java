package pl.nikowis.habits.dto;

import lombok.Data;

@Data
public class UpdateUserDTO {

    private Integer streakGoal;
    private String password;

}
