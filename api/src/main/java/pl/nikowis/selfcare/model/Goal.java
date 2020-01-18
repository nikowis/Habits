package pl.nikowis.selfcare.model;

import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private Date createdAt;
    private String createdBy;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "goal", cascade = {CascadeType.PERSIST})
    private List<Fulfilment> fulfilments = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        createdAt = new Date();
    }


}
