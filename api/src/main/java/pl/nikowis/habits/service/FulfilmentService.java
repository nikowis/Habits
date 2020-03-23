package pl.nikowis.habits.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pl.nikowis.habits.dto.FulfilableHabitDTO;
import pl.nikowis.habits.dto.FulfillHabitRequestDTO;

import java.util.List;

public interface FulfilmentService {
    FulfilableHabitDTO fulfilHabit(FulfillHabitRequestDTO fulfilDTO);

    Page<FulfilableHabitDTO> getDailyFulfilments(Pageable pageable);
}
