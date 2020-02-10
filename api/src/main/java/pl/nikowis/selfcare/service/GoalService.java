package pl.nikowis.selfcare.service;

import pl.nikowis.selfcare.dto.GoalDTO;

import java.util.List;

public interface GoalService {

    List<GoalDTO> getGoals();

    GoalDTO createGoal(GoalDTO goal);
}
