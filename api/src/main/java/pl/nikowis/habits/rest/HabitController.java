package pl.nikowis.habits.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.nikowis.habits.dto.CreateHabitDTO;
import pl.nikowis.habits.dto.HabitDTO;
import pl.nikowis.habits.security.SecurityConstants;
import pl.nikowis.habits.service.HabitService;

import java.util.List;

@RestController
@RequestMapping(path = HabitController.HABITS_ENDPOINT)
@Secured(SecurityConstants.ROLE_USER)
public class HabitController {

    public static final String HABITS_ENDPOINT = "/habits";
    public static final String HABIT_ID_VARIABLE = "habitId";
    public static final String HABIT_PATH = "/{" + HABIT_ID_VARIABLE + "}";
    public static final String HABIT_ENDPOINT = HABITS_ENDPOINT + HABIT_PATH;

    @Autowired
    private HabitService habitService;

    @GetMapping
    public List<HabitDTO> habitsList() {
        return habitService.getHabits();
    }

    @PostMapping
    public HabitDTO createHabit(@Validated @RequestBody CreateHabitDTO habit) {
        return habitService.createHabit(habit);
    }

    @PutMapping(path = HABIT_PATH)
    public HabitDTO updateHabit(@PathVariable(HABIT_ID_VARIABLE) Long habitId, @Validated @RequestBody CreateHabitDTO habit) {
        return habitService.updateHabit(habitId, habit);
    }

    @DeleteMapping(path = HABIT_PATH)
    public HabitDTO deleteHabit(@PathVariable(HABIT_ID_VARIABLE) Long habitId) {
        return habitService.deleteHabit(habitId);
    }

}
