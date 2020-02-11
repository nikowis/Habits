package pl.nikowis.selfcare.service;

import pl.nikowis.selfcare.dto.GoalDTO;

import java.util.List;

public interface GoalService {

    List<GoalDTO> getGoals();

    GoalDTO createGoal(GoalDTO goal);

    GoalDTO updateGoal(Long goalId, GoalDTO goalDTO);

    GoalDTO deleteGoal(Long goalDTO);
}
