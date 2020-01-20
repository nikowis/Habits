package pl.nikowis.selfcare.dto;

import lombok.Data;

@Data
public class RegisterUserDTO extends UserDTO {

    private Long id;
    private String login;
    private String password;

}
