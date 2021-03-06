package pl.nikowis.habits.service.impl;

import ma.glasnost.orika.MapperFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.nikowis.habits.dto.FulfilableHabitDTO;
import pl.nikowis.habits.dto.FulfillHabitRequestDTO;
import pl.nikowis.habits.exception.CannotFulfilInactiveHabitException;
import pl.nikowis.habits.exception.HabitAlreadyFulfiledException;
import pl.nikowis.habits.exception.HabitDoesntExistException;
import pl.nikowis.habits.model.Fulfilment;
import pl.nikowis.habits.model.Habit;
import pl.nikowis.habits.repository.FulfilmentRepository;
import pl.nikowis.habits.repository.HabitRepository;
import pl.nikowis.habits.repository.UserRepository;
import pl.nikowis.habits.service.FulfilmentService;
import pl.nikowis.habits.util.DateUtils;
import pl.nikowis.habits.util.SecurityUtils;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
class FulfilmentServiceImpl implements FulfilmentService {

    @Autowired
    private HabitRepository habitRepository;

    @Autowired
    private FulfilmentRepository fulfilmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MapperFacade mapperFacade;

    @Override
    public FulfilableHabitDTO fulfilHabit(FulfillHabitRequestDTO fulfilDTO) {
        Habit habit = habitRepository.findByIdAndUserId(fulfilDTO.getHabitId(), SecurityUtils.getCurrentUserId());
        if (habit == null) {
            throw new HabitDoesntExistException();
        }

        if (!habit.getActive()) {
            throw new CannotFulfilInactiveHabitException();
        }

        List<Fulfilment> existingFulfilments = fulfilmentRepository.findByUserIdAndCreatedAtBetweenAndHabitIdIn(SecurityUtils.getCurrentUserId(), DateUtils.getTodayDayStart(), DateUtils.getTodayDayEnd(), Collections.singletonList(fulfilDTO.getHabitId()));
        if (existingFulfilments.size() > 0) {
            throw new HabitAlreadyFulfiledException();
        }

        Fulfilment f = new Fulfilment();
        f.setHabit(habit);
        f.setUser(userRepository.findById(SecurityUtils.getCurrentUserId()).get());
        f.setFulfilled(true);
        fulfilmentRepository.save(f);
        habit.setStreak(habit.getStreak() + 1);
        habitRepository.save(habit);
        FulfilableHabitDTO fulfilableHabitDTO = new FulfilableHabitDTO(true);
        mapperFacade.map(habit, fulfilableHabitDTO);
        return fulfilableHabitDTO;
    }

    @Override
    public Page<FulfilableHabitDTO> getDailyFulfilments(Pageable pageable) {
        Page<Habit> habits = habitRepository.findByActiveAndUserId(true, SecurityUtils.getCurrentUserId(), pageable);

        Date startDate = DateUtils.getTodayDayStart();

        return habits.map(habit -> {
            FulfilableHabitDTO fulfilableHabitDTO = new FulfilableHabitDTO(habit.getUpdatedAt() != null && habit.getUpdatedAt().after(startDate));
            mapperFacade.map(habit, fulfilableHabitDTO);
            return fulfilableHabitDTO;
        });
    }
}
