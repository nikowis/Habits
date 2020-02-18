package pl.nikowis.selfcare.service.impl;

import ma.glasnost.orika.MapperFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.nikowis.selfcare.config.Profiles;
import pl.nikowis.selfcare.model.User;
import pl.nikowis.selfcare.model.UserDetailsImpl;
import pl.nikowis.selfcare.security.SecurityConstants;
import pl.nikowis.selfcare.service.UserService;

@Service
@Transactional
@Profile(Profiles.TEST)
public class TestUserDetailsService implements UserDetailsService {

    @Autowired
    private MapperFacade mapperFacade;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User userByLogin = new User();
        userByLogin.setLogin(username);
        userByLogin.setPassword(username);
        userByLogin.setRole(SecurityConstants.ROLE_USER);
        userByLogin.setId(1L);
        return mapperFacade.map(userByLogin, UserDetailsImpl.class);
    }
}
