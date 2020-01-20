package pl.nikowis.selfcare.service;

import pl.nikowis.selfcare.dto.GoalDTO;
import pl.nikowis.selfcare.model.Goal;

import java.util.List;

public interface GoalService {

    List<GoalDTO> getDailyGoals();

    GoalDTO createGoal(GoalDTO goal);
}
