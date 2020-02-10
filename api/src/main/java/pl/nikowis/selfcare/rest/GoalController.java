package pl.nikowis.selfcare.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.nikowis.selfcare.dto.FulfilableGoalDTO;
import pl.nikowis.selfcare.dto.GoalDTO;
import pl.nikowis.selfcare.service.GoalService;

import java.util.List;

@RestController
@RequestMapping(path = "/goals")
public class GoalController {

    @Autowired
    private GoalService goalService;

    @GetMapping
    public List<GoalDTO> goalsList() {
        return goalService.getGoals();
    }

    @PostMapping
    public GoalDTO createGoal(@RequestBody FulfilableGoalDTO goal) {
        return goalService.createGoal(goal);
    }
}
