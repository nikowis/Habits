package pl.nikowis.habits;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import pl.nikowis.habits.config.Profiles;

@SpringBootTest
@ActiveProfiles(Profiles.TEST)
class HabitsApplicationTests {

    @Test
    void contextLoads() {
    }

}
