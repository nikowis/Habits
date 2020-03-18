package pl.nikowis.habits.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class Scheduler {

    @Autowired
    private HabitService habitService;

    @Scheduled(cron = "0 0 0 * * *")
    public void updateFulfilments() {
        habitService.updateHabitStreaks();
    }
}
