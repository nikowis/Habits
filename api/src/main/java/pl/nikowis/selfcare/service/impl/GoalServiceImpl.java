package pl.nikowis.selfcare.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.nikowis.selfcare.dto.GoalDTO;
import pl.nikowis.selfcare.model.Goal;
import pl.nikowis.selfcare.model.UserDetailsImpl;
import pl.nikowis.selfcare.repository.impl.GoalRepository;
import pl.nikowis.selfcare.repository.impl.UserRepository;
import pl.nikowis.selfcare.service.GoalService;
import pl.nikowis.selfcare.util.SecurityUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
class GoalServiceImpl implements GoalService {

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<GoalDTO> getGoals() {
        return goalRepository.findAll().stream().map(GoalDTO::new).collect(Collectors.toList());
    }

    @Override
    public GoalDTO createGoal(GoalDTO dto) {
        UserDetailsImpl currentUserDetails = SecurityUtils.getCurrentUser();

        Goal goal = new Goal();
        goal.setTitle(dto.getTitle());
        goal.setDescription(dto.getDescription());
        goal.setUser(userRepository.findById(currentUserDetails.getId()).get());
        goal = goalRepository.save(goal);

        return new GoalDTO(goal);
    }
}
