package pl.nikowis.selfcare.repository.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.nikowis.selfcare.model.Goal;

import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {

    boolean existsByUserIdAndTitle(Long userId, String title);

    List<Goal> findByUserId(Long id);

    Goal findByIdAndUserId(Long id, Long userId);

    List<Goal> findByActiveAndUserId(Boolean active, Long userId);
}
