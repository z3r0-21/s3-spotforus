package nl.fontys.s3.spotforus.repositories;

import nl.fontys.s3.spotforus.entities.Household;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HouseholdRepository extends JpaRepository<Household, Long> {

}
