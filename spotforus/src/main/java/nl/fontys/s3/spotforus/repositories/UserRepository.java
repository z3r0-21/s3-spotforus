package nl.fontys.s3.spotforus.repositories;

import nl.fontys.s3.spotforus.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
}
