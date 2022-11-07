package nl.fontys.s3.spotforus.repositories;

import nl.fontys.s3.spotforus.entities.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findAllByHouseholdId(Long householdId);
}
