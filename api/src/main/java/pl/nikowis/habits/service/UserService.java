package pl.nikowis.habits.service;

import pl.nikowis.habits.dto.RegisterUserDTO;
import pl.nikowis.habits.dto.UpdateUserDTO;
import pl.nikowis.habits.dto.UserDTO;
import pl.nikowis.habits.model.User;

public interface UserService {
    User findUserByLogin(String login);

    User saveUser(User user);

    UserDTO register(RegisterUserDTO userDTO);

    UserDTO getCurrentUser();

    UserDTO updateUser(Long currentUserId, UpdateUserDTO user);

    void deleteUser(Long currentUserId);
}
