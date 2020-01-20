package pl.nikowis.selfcare.repository.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.nikowis.selfcare.model.Fulfilment;

import java.util.Date;
import java.util.List;

@Repository
public interface FulfilmentRepository extends JpaRepository<Fulfilment, Long> {

    List<Fulfilment> findByUserIdAndCreatedAtBetweenAndGoalIdIn(Long id, Date startDate, Date endDate, List<Long> goalIds);
}
