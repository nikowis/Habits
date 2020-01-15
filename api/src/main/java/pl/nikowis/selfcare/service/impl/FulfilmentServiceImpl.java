package pl.nikowis.selfcare.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.nikowis.selfcare.model.FulfillGoalDTO;
import pl.nikowis.selfcare.model.Fulfilment;
import pl.nikowis.selfcare.model.Goal;
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
    public Fulfilment fulfilGoal(FulfillGoalDTO fulfilDTO) {
        Optional<Goal> goal = goalRepository.findById(fulfilDTO.getGoalId());
        if (goal.isPresent()) {
            Fulfilment f = new Fulfilment();
            f.setGoal(goal.get());
            f.setCreatedBy(fulfilDTO.getLogin());
            f.setFulfilled(true);
            return fulfilmentRepository.save(f);
        }
        return null;
    }
}
