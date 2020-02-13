package pl.nikowis.selfcare.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import pl.nikowis.selfcare.config.GlobalExceptionHandler;
import pl.nikowis.selfcare.dto.RegisterUserDTO;
import pl.nikowis.selfcare.model.User;
import pl.nikowis.selfcare.repository.impl.UserRepository;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Transactional
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
    public void usernameNotAvailableTest() throws Exception {
        User user = new User();
        user.setLogin(LOGIN);
        user.setPassword(LOGIN);
        userRepository.save(user);

        RegisterUserDTO registerUserDTO = new RegisterUserDTO();
        user.setLogin(LOGIN);
        user.setPassword(LOGIN);

        mockMvc.perform(post(MainController.REGISTRATION_ENDPOINT).contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(registerUserDTO)))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }
}