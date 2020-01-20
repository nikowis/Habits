package pl.nikowis.selfcare.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class FulfillGoalRequestDTO {

    @NotNull
    private Long goalId;

}
