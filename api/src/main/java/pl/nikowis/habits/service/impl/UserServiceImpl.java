package pl.nikowis.habits.service.impl;

import ma.glasnost.orika.MapperFacade;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.nikowis.habits.dto.RegisterUserDTO;
import pl.nikowis.habits.dto.UpdateUserDTO;
import pl.nikowis.habits.dto.UserDTO;
import pl.nikowis.habits.exception.UsernameAlreadyExistsException;
import pl.nikowis.habits.model.User;
import pl.nikowis.habits.model.UserDetailsImpl;
import pl.nikowis.habits.repository.UserRepository;
import pl.nikowis.habits.security.SecurityConstants;
import pl.nikowis.habits.service.UserService;
import pl.nikowis.habits.util.SecurityUtils;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    public static final int DEFAULT_STREAK_GOAL = 28;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private MapperFacade mapperFacade;

    @Override
    public User findUserByLogin(String login) {
        return userRepository.findByLogin(login);
    }

    @Override
    public User saveUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public UserDTO register(RegisterUserDTO userDTO) {
        if (userRepository.findByLogin(userDTO.getLogin()) != null) {
            throw new UsernameAlreadyExistsException(new Object[]{userDTO.getLogin()});
        }

        User u = new User();
        u.setLogin(userDTO.getLogin());
        u.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
        u.setRole(SecurityConstants.ROLE_USER);
        u.setStreakGoal(DEFAULT_STREAK_GOAL);
        User saved = userRepository.save(u);
        return mapperFacade.map(saved, UserDTO.class);
    }

    @Override
    public UserDTO getCurrentUser() {
        User currentUser = userRepository.findById(SecurityUtils.getCurrentUserId()).get();
        return mapperFacade.map(currentUser, UserDTO.class);
    }

    @Override
    public UserDTO updateUser(Long currentUserId, UpdateUserDTO dto) {
        User user = userRepository.findById(currentUserId).get();
        user.setStreakGoal(dto.getStreakGoal());
        if(Strings.isNotBlank(dto.getPassword())) {
            user.setPassword(bCryptPasswordEncoder.encode(dto.getPassword()));
        }
        return mapperFacade.map(user, UserDTO.class);
    }

    @Override
    public void deleteUser(Long currentUserId) {
        User user = userRepository.findById(currentUserId).get();
        user.setActive(false);
        user.setLogin(String.valueOf(user.getLogin().hashCode()));
        userRepository.save(user);
    }

}
