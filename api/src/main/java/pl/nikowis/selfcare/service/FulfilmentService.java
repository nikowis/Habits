package pl.nikowis.selfcare.service;

import pl.nikowis.selfcare.dto.FulfillGoalRequestDTO;
import pl.nikowis.selfcare.dto.GoalDTO;

public interface FulfilmentService {
    GoalDTO fulfilGoal(FulfillGoalRequestDTO fulfilDTO);
}
