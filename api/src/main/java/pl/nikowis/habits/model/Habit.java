package pl.nikowis.habits.model;

import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Habit extends BaseEntity {

    private String title;
    private String description;
    private int streak;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "habit", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Fulfilment> fulfilments = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

}
