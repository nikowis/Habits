package pl.nikowis.selfcare.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Data
public class Fulfilment extends BaseEntity {

    private Boolean fulfilled;
    @ManyToOne
    @JoinColumn(name = "goalId")
    private Goal goal;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

}
