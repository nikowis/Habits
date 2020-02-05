package pl.nikowis.selfcare.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.nikowis.selfcare.dto.FulfillGoalRequestDTO;
import pl.nikowis.selfcare.dto.GoalDTO;
import pl.nikowis.selfcare.model.Fulfilment;
import pl.nikowis.selfcare.model.Goal;
import pl.nikowis.selfcare.model.UserDetailsImpl;
import pl.nikowis.selfcare.repository.impl.FulfilmentRepository;
import pl.nikowis.selfcare.repository.impl.GoalRepository;
import pl.nikowis.selfcare.repository.impl.UserRepository;
import pl.nikowis.selfcare.service.FulfilmentService;
import pl.nikowis.selfcare.util.SecurityUtils;

import java.util.Optional;

@Service
@Transactional
class FulfilmentServiceImpl implements FulfilmentService {

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private FulfilmentRepository fulfilmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public GoalDTO fulfilGoal(FulfillGoalRequestDTO fulfilDTO) {
        Optional<Goal> optGoal = goalRepository.findById(fulfilDTO.getGoalId());
        UserDetailsImpl currentUserDetails = SecurityUtils.getCurrentUser();

        if (optGoal.isPresent()) {
            Fulfilment f = new Fulfilment();
            Goal goal = optGoal.get();
            f.setGoal(goal);

            f.setUser(userRepository.findById(currentUserDetails.getId()).get());
            f.setFulfilled(true);
            fulfilmentRepository.save(f);
            return new GoalDTO(goal, true);
        }
        return null;
    }
}
