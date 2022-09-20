package nl.fontys.s3.spotforus.repositories;

import nl.fontys.s3.spotforus.entities.HouseholdSettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HouseholdSettingsRepository extends JpaRepository<HouseholdSettings, Long> {
}
