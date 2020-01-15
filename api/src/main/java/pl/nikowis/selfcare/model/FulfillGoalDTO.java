package pl.nikowis.selfcare.model;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class FulfillGoalDTO {

    @NotNull
    private Long goalId;
    @NotNull
    private String login;

}
