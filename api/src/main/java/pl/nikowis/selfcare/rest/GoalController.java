package pl.nikowis.selfcare.rest;

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
import pl.nikowis.selfcare.dto.CreateGoalDTO;
import pl.nikowis.selfcare.dto.GoalDTO;
import pl.nikowis.selfcare.security.SecurityConstants;
import pl.nikowis.selfcare.service.GoalService;

import java.util.List;

@RestController
@RequestMapping(path = GoalController.GOALS_ENDPOINT)
@Secured(SecurityConstants.ROLE_USER)
public class GoalController {

    public static final String GOALS_ENDPOINT = "/goals";
    public static final String GOAL_ID_VARIABLE = "goalId";
    public static final String GOAL_PATH = "/{"+ GOAL_ID_VARIABLE +"}";
    public static final String GOAL_ENDPOINT = GOALS_ENDPOINT + GOAL_PATH;

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

    @PutMapping(path = GOAL_PATH)
    public GoalDTO updateGoal(@PathVariable(GOAL_ID_VARIABLE) Long goalId, @Validated @RequestBody CreateGoalDTO goal) {
        return goalService.updateGoal(goalId, goal);
    }

    @DeleteMapping(path = GOAL_PATH)
    public GoalDTO deleteGoal(@PathVariable(GOAL_ID_VARIABLE) Long goalId) {
        return goalService.deleteGoal(goalId);
    }

}
