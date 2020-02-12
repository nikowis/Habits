package pl.nikowis.selfcare.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.nikowis.selfcare.dto.RegisterUserDTO;
import pl.nikowis.selfcare.dto.UserDTO;
import pl.nikowis.selfcare.service.UserService;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/registration")
    public UserDTO register(@Validated @RequestBody RegisterUserDTO userDTO) {
        return userService.register(userDTO);
    }

    @GetMapping("/me")
    public UserDTO getMe() {
        return userService.getCurrentUser();
    }

}
