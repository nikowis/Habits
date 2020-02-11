package pl.nikowis.selfcare.service.impl;

import ma.glasnost.orika.MapperFacade;
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
        User u = new User();
        u.setLogin(userDTO.getLogin());
        u.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
        User saved = userRepository.save(u);
        return mapperFacade.map(saved, UserDTO.class);
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
