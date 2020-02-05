package pl.nikowis.selfcare.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.nikowis.selfcare.dto.RegisterUserDTO;
import pl.nikowis.selfcare.dto.UserDTO;
import pl.nikowis.selfcare.model.User;
import pl.nikowis.selfcare.model.UserDetailsImpl;
import pl.nikowis.selfcare.repository.impl.UserRepository;
import pl.nikowis.selfcare.service.UserService;
import pl.nikowis.selfcare.util.SecurityUtils;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository,
                           BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

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
        User u = new User();
        u.setLogin(userDTO.getLogin());
        u.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
        User saved = userRepository.save(u);
        userDTO.setId(saved.getId());
        return userDTO;
    }

    @Override
    public UserDTO getCurrentUser() {
        UserDetailsImpl currentUser = SecurityUtils.getCurrentUser();
        UserDTO currentDto = new UserDTO();
        currentDto.setId(currentUser.getId());
        currentDto.setLogin(currentUser.getUsername());
        return currentDto;
    }

}
