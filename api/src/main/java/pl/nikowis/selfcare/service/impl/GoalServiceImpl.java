package pl.nikowis.selfcare.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.nikowis.selfcare.model.Goal;
import pl.nikowis.selfcare.repository.impl.GoalRepository;
import pl.nikowis.selfcare.service.GoalService;

import java.util.List;

@Service
class GoalServiceImpl implements GoalService {

    @Autowired
    private GoalRepository goalRepository;

    @Override
    public List<Goal> getAllGoals() {
        return goalRepository.findAll();
    }

    @Override
    public Goal createGoal(Goal goal) {
        goal.setId(null);
        return goalRepository.save(goal);
    }
}
