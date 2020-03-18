package pl.nikowis.habits.service;

import pl.nikowis.habits.dto.CreateHabitDTO;
import pl.nikowis.habits.dto.HabitDTO;

import java.util.List;

public interface HabitService {

    List<HabitDTO> getHabits();

    HabitDTO createHabit(CreateHabitDTO habit);

    HabitDTO updateHabit(Long habitId, CreateHabitDTO habitDTO);

    HabitDTO deleteHabit(Long habitDTO);

    void updateHabitStreaks();
}
