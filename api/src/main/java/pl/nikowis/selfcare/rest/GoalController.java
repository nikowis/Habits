package pl.nikowis.selfcare.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.nikowis.selfcare.dto.GoalDTO;
import pl.nikowis.selfcare.model.Goal;
import pl.nikowis.selfcare.service.GoalService;

import java.util.List;

@RestController
@RequestMapping(path = "/goals")
public class GoalController {

    @Autowired
    private GoalService goalService;

    @GetMapping
    public List<GoalDTO> goalsList() {
        return goalService.getDailyGoals();
    }

    @PostMapping
    public GoalDTO createGoal(@RequestBody GoalDTO goal) {
        return goalService.createGoal(goal);
    }
}
