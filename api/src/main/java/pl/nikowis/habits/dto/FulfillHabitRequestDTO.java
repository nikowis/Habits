package pl.nikowis.habits.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class FulfillHabitRequestDTO {

    @NotNull
    private Long habitId;

}
