package pl.nikowis.selfcare.dto;

import lombok.Data;

@Data
public class UserDTO {

    protected Long id;
    protected String login;
    protected String role;
    protected Boolean active;

}
