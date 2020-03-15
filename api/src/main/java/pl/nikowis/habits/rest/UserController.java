package pl.nikowis.habits.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.nikowis.habits.dto.UpdateUserDTO;
import pl.nikowis.habits.dto.UserDTO;
import pl.nikowis.habits.security.SecurityConstants;
import pl.nikowis.habits.service.UserService;
import pl.nikowis.habits.util.SecurityUtils;

@RestController
@RequestMapping(path = UserController.USERS_ENDPOINT)
@Secured(SecurityConstants.ROLE_USER)
public class UserController {

    public static final String USERS_ENDPOINT = "/user";

    @Autowired
    private UserService userService;

    @GetMapping
    public UserDTO user() {
        return userService.getCurrentUser();
    }

    @PutMapping
    public UserDTO updateUser(@Validated @RequestBody UpdateUserDTO user) {
        return userService.updateUser(SecurityUtils.getCurrentUserId(), user);
    }

    @DeleteMapping
    public void deleteUser() {
        userService.deleteUser(SecurityUtils.getCurrentUserId());
    }

}
