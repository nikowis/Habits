package pl.nikowis.selfcare.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.nikowis.selfcare.dto.GoalDTO;
import pl.nikowis.selfcare.model.Fulfilment;
import pl.nikowis.selfcare.model.Goal;
import pl.nikowis.selfcare.model.User;
import pl.nikowis.selfcare.repository.impl.FulfilmentRepository;
import pl.nikowis.selfcare.repository.impl.GoalRepository;
import pl.nikowis.selfcare.service.GoalService;
import pl.nikowis.selfcare.util.DateUtils;
import pl.nikowis.selfcare.util.SecurityUtils;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
class GoalServiceImpl implements GoalService {

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private FulfilmentRepository fulfilmentRepository;

    @Override
    public List<GoalDTO> getDailyGoals() {
        List<Goal> goals = goalRepository.findAll();
        List<Long> goalIds = goals.stream().map(Goal::getId).collect(Collectors.toList());
        List<GoalDTO> dailyGoals = goals.stream().map(GoalDTO::new).collect(Collectors.toList());

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


    @Override
    public GoalDTO createGoal(GoalDTO dto) {
        Goal goal = new Goal();
        goal.setTitle(dto.getTitle());
        goal.setDescription(dto.getDescription());
        goal.setUser(SecurityUtils.getCurrentUser());
        goal = goalRepository.save(goal);

        return new GoalDTO(goal);
    }
}
