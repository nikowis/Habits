package pl.nikowis.habits.service;

import pl.nikowis.habits.dto.FulfilableHabitDTO;
import pl.nikowis.habits.dto.FulfillHabitRequestDTO;

import java.util.List;

public interface FulfilmentService {
    FulfilableHabitDTO fulfilHabit(FulfillHabitRequestDTO fulfilDTO);

    List<FulfilableHabitDTO> getDailyFulfilments();
}
