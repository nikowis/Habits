package pl.nikowis.selfcare.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.nikowis.selfcare.dto.FulfilableGoalDTO;
import pl.nikowis.selfcare.dto.FulfillGoalRequestDTO;
import pl.nikowis.selfcare.exception.CannotFulfilInactiveGoal;
import pl.nikowis.selfcare.model.Fulfilment;
import pl.nikowis.selfcare.model.Goal;
import pl.nikowis.selfcare.model.UserDetailsImpl;
import pl.nikowis.selfcare.repository.impl.FulfilmentRepository;
import pl.nikowis.selfcare.repository.impl.GoalRepository;
import pl.nikowis.selfcare.repository.impl.UserRepository;
import pl.nikowis.selfcare.service.FulfilmentService;
import pl.nikowis.selfcare.util.DateUtils;
import pl.nikowis.selfcare.util.SecurityUtils;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public FulfilableGoalDTO fulfilGoal(FulfillGoalRequestDTO fulfilDTO) {
        Goal goal = goalRepository.findByIdAndUserId(fulfilDTO.getGoalId(), SecurityUtils.getCurrentUserId());
        if(goal == null) {
            throw new GoalDoesntExistException();
        }
        UserDetailsImpl currentUserDetails = SecurityUtils.getCurrentUser();

        if(!goal.getActive()) {
            throw new CannotFulfilInactiveGoal();
        }

        Fulfilment f = new Fulfilment();
        f.setGoal(goal);

        f.setUser(userRepository.findById(currentUserDetails.getId()).get());
        f.setFulfilled(true);
        fulfilmentRepository.save(f);
        return new FulfilableGoalDTO(goal, true);
    }

    @Override
    public List<FulfilableGoalDTO> getDailyFulfilments() {
        List<Goal> goals = goalRepository.findByActiveAndUserId(true, SecurityUtils.getCurrentUserId());
        List<Long> goalIds = goals.stream().map(Goal::getId).collect(Collectors.toList());
        List<FulfilableGoalDTO> dailyGoals = goals.stream().map(FulfilableGoalDTO::new).collect(Collectors.toList());

        Date startDate = DateUtils.getTodayDayStart();
        Date endDate = DateUtils.getTodayDayEnd();

        List<Fulfilment> fulfilments = fulfilmentRepository.findByUserIdAndCreatedAtBetweenAndGoalIdIn(1L, startDate, endDate, goalIds);

        fulfilments.forEach(f -> dailyGoals.forEach(g -> {
            if (g.getId().equals(f.getGoal().getId())) {
                g.setFulfilled(true);
            }
        }));

        return dailyGoals;
    }
}
