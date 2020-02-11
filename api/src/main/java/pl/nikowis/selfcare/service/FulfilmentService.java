package pl.nikowis.selfcare.service;

import pl.nikowis.selfcare.dto.FulfilableGoalDTO;
import pl.nikowis.selfcare.dto.FulfillGoalRequestDTO;

import java.util.List;

public interface FulfilmentService {
    FulfilableGoalDTO fulfilGoal(FulfillGoalRequestDTO fulfilDTO);

    List<FulfilableGoalDTO> getDailyFulfilments();
}
