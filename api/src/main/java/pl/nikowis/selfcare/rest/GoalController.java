package pl.nikowis.selfcare.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.nikowis.selfcare.dto.CreateGoalDTO;
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
    public GoalDTO createGoal(@Validated @RequestBody CreateGoalDTO goal) {
        return goalService.createGoal(goal);
    }

    @PutMapping(path = "/{goalId}")
    public GoalDTO updateGoal(@PathVariable("goalId") Long goalId, @Validated @RequestBody CreateGoalDTO goal) {
        return goalService.updateGoal(goalId, goal);
    }

    @DeleteMapping(path = "/{goalId}")
    public GoalDTO deleteGoal(@PathVariable("goalId") Long goalId) {
        return goalService.deleteGoal(goalId);
    }

}
