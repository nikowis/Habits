package pl.nikowis.selfcare.service;

import pl.nikowis.selfcare.model.FulfillGoalRequestDTO;
import pl.nikowis.selfcare.model.GoalDTO;

public interface FulfilmentService {
    GoalDTO fulfilGoal(FulfillGoalRequestDTO fulfilDTO);
}
