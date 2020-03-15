package pl.nikowis.habits.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Data
public class Fulfilment extends BaseEntity {

    private Boolean fulfilled;
    @ManyToOne
    @JoinColumn(name = "habitId")
    private Habit habit;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

}
