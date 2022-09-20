package nl.fontys.s3.spotforus.repositories;

import nl.fontys.s3.spotforus.entities.HouseholdDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HouseholdDetailsRepository extends JpaRepository<HouseholdDetails, Long> {
}
