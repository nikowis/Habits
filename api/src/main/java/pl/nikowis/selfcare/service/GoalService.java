package pl.nikowis.selfcare.service;

import pl.nikowis.selfcare.model.Goal;
import pl.nikowis.selfcare.model.GoalDTO;

import java.util.List;

public interface GoalService {

    List<GoalDTO> getDailyGoals(String login);

    Goal createGoal(Goal goal);
}
