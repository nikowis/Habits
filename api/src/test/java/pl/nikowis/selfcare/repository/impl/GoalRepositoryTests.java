package pl.nikowis.selfcare.repository.impl;


import org.joda.time.DateTime;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import pl.nikowis.selfcare.model.Fulfilment;
import pl.nikowis.selfcare.model.Goal;

import java.util.Date;
import java.util.List;

@SpringBootTest
@Transactional
public class GoalRepositoryTests {

    @Autowired
    private GoalRepository goalRepository;

    private Goal g1;
    private Fulfilment f1;
    private Fulfilment f2;
    private Fulfilment f3;
    private static final String TITLE1 = "test goal 1";
    private static final String USER = "test user";
    private static final String USER2 = "anonymous";

    @BeforeEach
    void setUp() {
        f1 = new Fulfilment();
        f1.setCreatedAt(new Date());
        f1.setCreatedBy(USER);
        f1.setFulfilled(true);

        f2 = new Fulfilment();
        f2.setCreatedAt(DateTime.now().minusDays(2).toDate());
        f2.setCreatedBy(USER);
        f2.setFulfilled(true);

        f3 = new Fulfilment();
        f3.setCreatedAt(DateTime.now().minusDays(2).toDate());
        f3.setCreatedBy(USER2);
        f3.setFulfilled(true);

        g1 = new Goal();
        g1.setTitle(TITLE1);
        g1.setCreatedBy(USER);
        g1.setCreatedBy(USER);
        g1.getFulfilments().add(f1);
        g1.getFulfilments().add(f2);
        g1.getFulfilments().add(f3);
    }

    @Test
    public void testSave() {
        goalRepository.save(g1);

        List<Goal> all = goalRepository.findByTitle(TITLE1);

        Assertions.assertNotNull(all);
        Assertions.assertEquals(1, all.size());
    }


}
