package pl.nikowis.selfcare.service;

import pl.nikowis.selfcare.dto.RegisterUserDTO;
import pl.nikowis.selfcare.dto.UserDTO;
import pl.nikowis.selfcare.model.User;

public interface UserService {
    User findUserByLogin(String login);

    User saveUser(User user);

    UserDTO register(RegisterUserDTO userDTO);

    UserDTO getCurrentUser();
}
