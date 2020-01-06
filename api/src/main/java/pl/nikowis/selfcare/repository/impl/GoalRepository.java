package pl.nikowis.selfcare.repository.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.nikowis.selfcare.model.Goal;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {

}
