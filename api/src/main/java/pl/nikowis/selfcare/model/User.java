package pl.nikowis.selfcare.model;

import lombok.Data;
import org.hibernate.validator.constraints.Length;
import pl.nikowis.selfcare.security.SecurityConstants;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "[user]")
@Data
public class User extends BaseEntity {

    @NotBlank
    @Size(min = 2, max = 128)
    private String login;

    @NotBlank
    @Size(min = 2)
    private String password;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private List<Fulfilment> fulfilments = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private List<Goal> goals = new ArrayList<>();

    @NotBlank
    @Transient
    private String role = SecurityConstants.USER_ROLE;

}
