package pl.nikowis.selfcare.service;

import pl.nikowis.selfcare.model.Goal;

import java.util.List;

public interface GoalService {

    List<Goal> getAllGoals();

    Goal createGoal(Goal goal);
}
