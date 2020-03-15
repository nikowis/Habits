package pl.nikowis.habits.dto;

import lombok.Data;

@Data
public class FulfilableHabitDTO extends HabitDTO {

    private boolean fulfilled;

    public FulfilableHabitDTO() {
    }

    public FulfilableHabitDTO(boolean fulfilled) {
        this.fulfilled = fulfilled;
    }
}
