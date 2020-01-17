package pl.nikowis.selfcare.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.nikowis.selfcare.model.FulfillGoalRequestDTO;
import pl.nikowis.selfcare.model.Fulfilment;
import pl.nikowis.selfcare.model.Goal;
import pl.nikowis.selfcare.model.GoalDTO;
import pl.nikowis.selfcare.repository.impl.FulfilmentRepository;
import pl.nikowis.selfcare.repository.impl.GoalRepository;
import pl.nikowis.selfcare.service.FulfilmentService;

import java.util.Optional;

@Service
class FulfilmentServiceImpl implements FulfilmentService {

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private FulfilmentRepository fulfilmentRepository;

    @Override
    public GoalDTO fulfilGoal(FulfillGoalRequestDTO fulfilDTO) {
        Optional<Goal> optGoal = goalRepository.findById(fulfilDTO.getGoalId());
        if (optGoal.isPresent()) {
            Fulfilment f = new Fulfilment();
            Goal goal = optGoal.get();
            f.setGoal(goal);
            f.setCreatedBy(fulfilDTO.getLogin());
            f.setFulfilled(true);
            fulfilmentRepository.save(f);
            return new GoalDTO(goal, true);
        }
        return null;
    }
}
