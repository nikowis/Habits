package pl.nikowis.selfcare.service;

import pl.nikowis.selfcare.dto.CreateGoalDTO;
import pl.nikowis.selfcare.dto.GoalDTO;

import java.util.List;

public interface GoalService {

    List<GoalDTO> getGoals();

    GoalDTO createGoal(CreateGoalDTO goal);

    GoalDTO updateGoal(Long goalId, CreateGoalDTO goalDTO);

    GoalDTO deleteGoal(Long goalDTO);
}
