package pl.nikowis.habits.service.impl;

import ma.glasnost.orika.MapperFacade;
import org.springframework.beans.factory.annotation.Autowired;
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
import pl.nikowis.habits.util.SecurityUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
class HabitServiceImpl implements HabitService {

    @Autowired
    private HabitRepository habitRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MapperFacade mapperFacade;

    @Override
    public List<HabitDTO> getHabits() {
        return habitRepository.findByUserId(SecurityUtils.getCurrentUserId()).stream().map(g -> mapperFacade.map(g, HabitDTO.class)).collect(Collectors.toList());
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
}
