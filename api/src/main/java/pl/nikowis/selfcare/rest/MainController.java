package pl.nikowis.selfcare.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.nikowis.selfcare.dto.RegisterUserDTO;
import pl.nikowis.selfcare.dto.UserDTO;
import pl.nikowis.selfcare.service.UserService;

@RestController
public class MainController {

    @Autowired
    private UserService userService;

    @PostMapping("/registration")
    public UserDTO getMessage(@RequestBody RegisterUserDTO userDTO) {
        UserDTO registered = userService.register(userDTO);
        return registered;
    }


}
