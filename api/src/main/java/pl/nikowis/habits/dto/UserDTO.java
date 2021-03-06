package pl.nikowis.habits.dto;

import lombok.Data;

@Data
public class UserDTO {

    protected Long id;
    protected String login;
    protected String role;
    protected Boolean active;
    protected int streakGoal;
}
