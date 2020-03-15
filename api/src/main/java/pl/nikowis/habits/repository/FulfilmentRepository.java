package pl.nikowis.habits.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.nikowis.habits.model.Fulfilment;

import java.util.Date;
import java.util.List;

@Repository
public interface FulfilmentRepository extends JpaRepository<Fulfilment, Long> {

    List<Fulfilment> findByUserIdAndCreatedAtBetweenAndHabitIdIn(Long id, Date startDate, Date endDate, List<Long> habitIds);
}
