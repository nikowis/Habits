package pl.nikowis.selfcare.model;

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
public class Goal extends BaseEntity {

    private String title;
    private String description;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "goal", cascade = {CascadeType.PERSIST})
    private List<Fulfilment> fulfilments = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

}
