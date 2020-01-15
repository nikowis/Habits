package pl.nikowis.selfcare.repository.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.nikowis.selfcare.model.Fulfilment;

import java.util.Date;
import java.util.List;

@Repository
public interface FulfilmentRepository extends JpaRepository<Fulfilment, Long> {

    @Query("SELECT f FROM Fulfilment f WHERE f.createdBy = :user OR f.createdBy is null ")
    List<Fulfilment> findAllFulfilments(@Param("user") String user);

    List<Fulfilment> findByCreatedByAndCreatedAtBetweenAndGoalIdIn(String user, Date startDate, Date endDate, List<Long> goalIds);
}
