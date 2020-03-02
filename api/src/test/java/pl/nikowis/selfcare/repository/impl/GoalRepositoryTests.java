package pl.nikowis.selfcare.repository.impl;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import pl.nikowis.selfcare.config.Profiles;
import pl.nikowis.selfcare.model.Goal;
import pl.nikowis.selfcare.model.User;
import pl.nikowis.selfcare.security.SecurityConstants;

import java.util.List;

@SpringBootTest
@Transactional
@ActiveProfiles(profiles = Profiles.TEST)
public class GoalRepositoryTests {

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private UserRepository userRepository;

    private User u1;
    private Goal g1;
    private static final String TITLE1 = "test goal 1";
    private static final String USER_LOGIN = "test@mailinator.com";

    @BeforeEach
    void setUp() {
        u1 = new User();
        u1.setLogin(USER_LOGIN);
        u1.setPassword(USER_LOGIN);
        u1.setId(1L);
        u1.setRole(SecurityConstants.ROLE_USER);
        u1 = userRepository.save(u1);

        g1 = new Goal();
        g1.setTitle(TITLE1);
        g1.setUser(u1);
    }

    @Test
    public void testSave() {
        goalRepository.save(g1);

        List<Goal> all = goalRepository.findByTitle(TITLE1);

        Assertions.assertNotNull(all);
        Assertions.assertEquals(1, all.size());
    }


}
