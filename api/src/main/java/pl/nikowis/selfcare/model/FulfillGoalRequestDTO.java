package pl.nikowis.selfcare.model;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class FulfillGoalRequestDTO {

    @NotNull
    private Long goalId;
    @NotNull
    private String login;

}
