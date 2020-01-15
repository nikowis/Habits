package pl.nikowis.selfcare.service;

import pl.nikowis.selfcare.model.FulfillGoalDTO;
import pl.nikowis.selfcare.model.Fulfilment;

public interface FulfilmentService {
    Fulfilment fulfilGoal(FulfillGoalDTO fulfilDTO);
}
