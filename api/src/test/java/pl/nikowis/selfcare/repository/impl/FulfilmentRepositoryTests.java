package pl.nikowis.selfcare.repository.impl;


import org.joda.time.DateTime;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import pl.nikowis.selfcare.model.Fulfilment;
import pl.nikowis.selfcare.model.Goal;
import pl.nikowis.selfcare.util.DateUtils;

import java.util.Collections;
import java.util.Date;
import java.util.List;

@SpringBootTest
@Transactional
@ActiveProfiles(profiles = "test")
public class FulfilmentRepositoryTests {

    @Autowired
    private FulfilmentRepository fulfilmentRepository;

    @Autowired
    private GoalRepository goalRepository;

    private Goal g1;
    private Fulfilment f1;
    private Fulfilment f2;
    private Fulfilment f3;
    private static final String TITLE1 = "test goal 1";
    private static final String USER = "test user";
    private static final String USER2 = "anonymous";
    private static final long GOAL_ID = 1L;

    @BeforeEach
    void setUp() {

        g1 = new Goal();
        g1.setId(GOAL_ID);
        g1.setCreatedBy(USER);
        g1.setTitle(TITLE1);
        g1.setCreatedAt(new Date());


        f1 = new Fulfilment();
        f1.setCreatedAt(new Date());
        f1.setCreatedBy(USER);
        f1.setFulfilled(true);
        f1.setGoal(g1);

        f2 = new Fulfilment();
        f2.setCreatedAt(DateTime.now().minusDays(2).toDate());
        f2.setCreatedBy(USER);
        f2.setFulfilled(true);
        f2.setGoal(g1);

        f3 = new Fulfilment();
        f3.setCreatedAt(DateTime.now().toDate());
        f3.setCreatedBy(USER2);
        f3.setFulfilled(true);
        f3.setGoal(g1);
    }

    @Test
    public void testSave() {
        goalRepository.save(g1);
        fulfilmentRepository.save(f1);
        fulfilmentRepository.save(f2);
        fulfilmentRepository.save(f3);

        Date startDate = DateUtils.getTodayDayStart();
        Date endDate = DateUtils.getTodayDayEnd();

        List<Fulfilment> all = fulfilmentRepository.findByCreatedByAndCreatedAtBetweenAndGoalIdIn(USER, startDate, endDate, Collections.singletonList(GOAL_ID));

        Assertions.assertNotNull(all);
        Assertions.assertEquals(1, all.size());
    }


}
