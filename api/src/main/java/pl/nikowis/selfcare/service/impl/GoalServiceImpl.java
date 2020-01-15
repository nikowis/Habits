package pl.nikowis.selfcare.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.nikowis.selfcare.model.DailyGoalDTO;
import pl.nikowis.selfcare.model.Fulfilment;
import pl.nikowis.selfcare.model.Goal;
import pl.nikowis.selfcare.repository.impl.FulfilmentRepository;
import pl.nikowis.selfcare.repository.impl.GoalRepository;
import pl.nikowis.selfcare.service.GoalService;
import pl.nikowis.selfcare.util.DateUtils;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
class GoalServiceImpl implements GoalService {

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private FulfilmentRepository fulfilmentRepository;

    @Override
    public List<DailyGoalDTO> getDailyGoals(String login) {
        List<Goal> goals = goalRepository.findAll();
        List<Long> goalIds = goals.stream().map(Goal::getId).collect(Collectors.toList());
        List<DailyGoalDTO> dailyGoals = goals.stream().map(DailyGoalDTO::new).collect(Collectors.toList());

        Date startDate = DateUtils.getTodayDayStart();
        Date endDate = DateUtils.getTodayDayEnd();

        List<Fulfilment> fulfilments = fulfilmentRepository.findByCreatedByAndCreatedAtBetweenAndGoalIdIn(login, startDate, endDate, goalIds);

        fulfilments.forEach(f -> dailyGoals.forEach(g -> {
            if (g.getId().equals(f.getGoal().getId())) {
                g.setFulfilled(true);
            }
        }));

        return dailyGoals;
    }


    @Override
    public Goal createGoal(Goal goal) {
        goal.setId(null);
        return goalRepository.save(goal);
    }
}
