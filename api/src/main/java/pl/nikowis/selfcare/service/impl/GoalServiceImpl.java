package pl.nikowis.selfcare.service.impl;

import ma.glasnost.orika.MapperFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.nikowis.selfcare.dto.CreateGoalDTO;
import pl.nikowis.selfcare.dto.GoalDTO;
import pl.nikowis.selfcare.exception.GoalAlreadyExistsException;
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

    @Autowired
    private MapperFacade mapperFacade;

    @Override
    public List<GoalDTO> getGoals() {
        return goalRepository.findByUserId(SecurityUtils.getCurrentUserId()).stream().map(g -> mapperFacade.map(g, GoalDTO.class)).collect(Collectors.toList());
    }

    @Override
    public GoalDTO createGoal(CreateGoalDTO dto) {
        if(goalRepository.existsByUserIdAndTitle(SecurityUtils.getCurrentUserId(), dto.getTitle())) {
            throw new GoalAlreadyExistsException();
        }

        UserDetailsImpl currentUserDetails = SecurityUtils.getCurrentUser();

        Goal goal = new Goal();
        mapperFacade.map(dto, goal);
        goal.setUser(userRepository.findById(currentUserDetails.getId()).get());
        goal = goalRepository.save(goal);
        return mapperFacade.map(goal, GoalDTO.class);
    }

    @Override
    public GoalDTO updateGoal(Long goalId, CreateGoalDTO goalDTO) {
        Goal goal = goalRepository.findByIdAndUserId(goalId, SecurityUtils.getCurrentUserId());
        mapperFacade.map(goalDTO, goal);
        Goal saved = goalRepository.save(goal);
        return mapperFacade.map(saved, GoalDTO.class);
    }

    @Override
    public GoalDTO deleteGoal(Long goalId) {
        Goal goal = goalRepository.findByIdAndUserId(goalId, SecurityUtils.getCurrentUserId());
        goal.setActive(false);
        Goal saved = goalRepository.save(goal);
        return mapperFacade.map(saved, GoalDTO.class);
    }
}
