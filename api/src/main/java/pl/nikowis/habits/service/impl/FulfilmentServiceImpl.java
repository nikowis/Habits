package pl.nikowis.habits.service.impl;

import ma.glasnost.orika.MapperFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.nikowis.habits.dto.FulfilableHabitDTO;
import pl.nikowis.habits.dto.FulfillHabitRequestDTO;
import pl.nikowis.habits.exception.CannotFulfilInactiveHabitException;
import pl.nikowis.habits.exception.HabitDoesntExistException;
import pl.nikowis.habits.model.Fulfilment;
import pl.nikowis.habits.model.Habit;
import pl.nikowis.habits.repository.impl.FulfilmentRepository;
import pl.nikowis.habits.repository.impl.HabitRepository;
import pl.nikowis.habits.repository.impl.UserRepository;
import pl.nikowis.habits.service.FulfilmentService;
import pl.nikowis.habits.util.DateUtils;
import pl.nikowis.habits.util.SecurityUtils;

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

        Fulfilment f = new Fulfilment();
        f.setHabit(habit);
        f.setUser(userRepository.findById(SecurityUtils.getCurrentUserId()).get());
        f.setFulfilled(true);
        fulfilmentRepository.save(f);

        FulfilableHabitDTO fulfilableHabitDTO = new FulfilableHabitDTO(true);
        mapperFacade.map(habit, fulfilableHabitDTO);
        return fulfilableHabitDTO;
    }

    @Override
    public List<FulfilableHabitDTO> getDailyFulfilments() {
        List<Habit> habits = habitRepository.findByActiveAndUserId(true, SecurityUtils.getCurrentUserId());
        List<Long> habitIds = habits.stream().map(Habit::getId).collect(Collectors.toList());
        List<FulfilableHabitDTO> dailyHabitss = habits.stream().map(g -> {
            FulfilableHabitDTO fulfilableHabitDTO = new FulfilableHabitDTO(false);
            mapperFacade.map(g, fulfilableHabitDTO);
            return fulfilableHabitDTO;
        }).collect(Collectors.toList());

        Date startDate = DateUtils.getTodayDayStart();
        Date endDate = DateUtils.getTodayDayEnd();

        List<Fulfilment> fulfilments = fulfilmentRepository.findByUserIdAndCreatedAtBetweenAndHabitIdIn(1L, startDate, endDate, habitIds);

        fulfilments.forEach(f -> dailyHabitss.forEach(g -> {
            if (g.getId().equals(f.getHabit().getId())) {
                g.setFulfilled(true);
            }
        }));

        return dailyHabitss;
    }
}
