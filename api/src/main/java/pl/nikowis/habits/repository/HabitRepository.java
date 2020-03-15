package pl.nikowis.habits.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.nikowis.habits.model.Habit;

import java.util.List;

@Repository
public interface HabitRepository extends JpaRepository<Habit, Long> {

    boolean existsByUserIdAndTitle(Long userId, String title);

    List<Habit> findByUserId(Long id);

    Habit findByIdAndUserId(Long id, Long userId);

    List<Habit> findByActiveAndUserId(Boolean active, Long userId);
}
