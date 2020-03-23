package pl.nikowis.habits.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pl.nikowis.habits.dto.CreateHabitDTO;
import pl.nikowis.habits.dto.HabitDTO;

import java.util.List;

public interface HabitService {

    Page<HabitDTO> getHabits(Pageable pageable);

    HabitDTO createHabit(CreateHabitDTO habit);

    HabitDTO updateHabit(Long habitId, CreateHabitDTO habitDTO);

    HabitDTO deleteHabit(Long habitDTO);

    void updateHabitStreaks();
}
