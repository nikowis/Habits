package pl.nikowis.selfcare.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import pl.nikowis.selfcare.config.GlobalExceptionHandler;
import pl.nikowis.selfcare.config.Profiles;
import pl.nikowis.selfcare.dto.RegisterUserDTO;
import pl.nikowis.selfcare.model.User;
import pl.nikowis.selfcare.repository.impl.UserRepository;
import pl.nikowis.selfcare.security.SecurityConstants;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Transactional
@ActiveProfiles(profiles = Profiles.TEST)
class MainControllerTest {

    private MockMvc mockMvc;

    @Autowired
    private MainController mainController;

    @Autowired
    private GlobalExceptionHandler globalExceptionHandler;

    @Autowired
    private UserRepository userRepository;

    private final static String LOGIN="testuser2";

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(mainController)
                .setControllerAdvice(globalExceptionHandler)
                .build();

    }

    @Test
    @WithAnonymousUser
    public void registerTest() throws Exception {
        RegisterUserDTO user = new RegisterUserDTO();
        user.setLogin(LOGIN);
        user.setPassword(LOGIN);

        mockMvc.perform(post(MainController.REGISTRATION_ENDPOINT).contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(user)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.login").value(LOGIN));
    }

    @Test
    @WithAnonymousUser
    public void usernameNotAvailableTest() throws Exception {
        User user = new User();
        user.setLogin(LOGIN);
        user.setPassword(LOGIN);
        user.setRole(SecurityConstants.ROLE_USER);
        userRepository.save(user);

        RegisterUserDTO registerUserDTO = new RegisterUserDTO();
        user.setLogin(LOGIN);
        user.setPassword(LOGIN);

        mockMvc.perform(post(MainController.REGISTRATION_ENDPOINT).contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(registerUserDTO)))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithUserDetails(LOGIN)
    public void getMe() throws Exception {
        mockMvc.perform(get(MainController.ME_ENDPOINT))
                .andDo(print())
                .andExpect(status().isOk());
    }
}