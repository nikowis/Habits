package pl.nikowis.selfcare;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import pl.nikowis.selfcare.config.Profiles;

@SpringBootTest
@ActiveProfiles(Profiles.TEST)
class SelfCareApplicationTests {

    @Test
    void contextLoads() {
    }

}
