package pl.nikowis.selfcare.service;

import pl.nikowis.selfcare.model.DailyGoalDTO;
import pl.nikowis.selfcare.model.Goal;

import java.util.List;

public interface GoalService {

    List<DailyGoalDTO> getDailyGoals(String login);

    Goal createGoal(Goal goal);
}
