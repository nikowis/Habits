package pl.nikowis.habits.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.nikowis.habits.model.Habit;

import java.util.Date;
import java.util.List;

@Repository
public interface HabitRepository extends JpaRepository<Habit, Long> {

    boolean existsByUserIdAndTitle(Long userId, String title);

    List<Habit> findByUserId(Long id);

    Habit findByIdAndUserId(Long id, Long userId);

    List<Habit> findByActiveAndUserId(Boolean active, Long userId);

    @Modifying
    @Query("UPDATE Habit h SET h.streak = 0 WHERE h.active=TRUE AND h.updatedAt < :streakResetDate")
    void updateHabitStreaks(@Param("streakResetDate") Date streakResetDate);
}
