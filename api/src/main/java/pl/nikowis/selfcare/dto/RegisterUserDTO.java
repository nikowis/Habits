package pl.nikowis.selfcare.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class RegisterUserDTO {

    @NotBlank
    @Size(min = 2)
    private String login;
    @Size(min = 2)
    @NotBlank
    private String password;

}
