package pl.nikowis.habits.service.impl;

import ma.glasnost.orika.MapperFacade;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.nikowis.habits.dto.CreateHabitDTO;
import pl.nikowis.habits.dto.HabitDTO;
import pl.nikowis.habits.exception.HabitAlreadyExistsException;
import pl.nikowis.habits.model.Habit;
import pl.nikowis.habits.model.UserDetailsImpl;
import pl.nikowis.habits.repository.HabitRepository;
import pl.nikowis.habits.repository.UserRepository;
import pl.nikowis.habits.service.HabitService;
import pl.nikowis.habits.util.DateUtils;
import pl.nikowis.habits.util.SecurityUtils;

import java.util.Date;

@Service
@Transactional
class HabitServiceImpl implements HabitService {

    private static final Logger LOGGER = LoggerFactory.getLogger(HabitServiceImpl.class);
    public static final int RESET_STREAK_DAYS = 1;

    @Autowired
    private HabitRepository habitRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MapperFacade mapperFacade;

    @Override
    public Page<HabitDTO> getHabits(Pageable pageable) {
        return habitRepository.findByUserId(SecurityUtils.getCurrentUserId(), pageable).map(g -> mapperFacade.map(g, HabitDTO.class));
    }

    @Override
    public HabitDTO createHabit(CreateHabitDTO dto) {
        if(habitRepository.existsByUserIdAndTitle(SecurityUtils.getCurrentUserId(), dto.getTitle())) {
            throw new HabitAlreadyExistsException();
        }

        UserDetailsImpl currentUserDetails = SecurityUtils.getCurrentUser();

        Habit habit = new Habit();
        mapperFacade.map(dto, habit);
        habit.setUser(userRepository.findById(currentUserDetails.getId()).get());
        habit = habitRepository.save(habit);
        return mapperFacade.map(habit, HabitDTO.class);
    }

    @Override
    public HabitDTO updateHabit(Long habitId, CreateHabitDTO habitDTO) {
        Habit habit = habitRepository.findByIdAndUserId(habitId, SecurityUtils.getCurrentUserId());
        mapperFacade.map(habitDTO, habit);
        Habit saved = habitRepository.save(habit);
        return mapperFacade.map(saved, HabitDTO.class);
    }

    @Override
    public HabitDTO deleteHabit(Long habitDTO) {
        Habit habit = habitRepository.findByIdAndUserId(habitDTO, SecurityUtils.getCurrentUserId());
        habit.setActive(false);
        Habit saved = habitRepository.save(habit);
        return mapperFacade.map(saved, HabitDTO.class);
    }

    @Override
    public void updateHabitStreaks() {
        LOGGER.info("UPDATING HABITS");
        Date resetStreakDays = DateUtils.getNowMinusDays(RESET_STREAK_DAYS);
        habitRepository.updateHabitStreaks(resetStreakDays);
    }
}
