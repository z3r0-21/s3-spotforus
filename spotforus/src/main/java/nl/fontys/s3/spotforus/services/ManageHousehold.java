package nl.fontys.s3.spotforus.services;

import nl.fontys.s3.spotforus.entities.Household;

import java.util.List;
import java.util.Optional;

public interface ManageHousehold {
    Household addHousehold(Household household);
    Household getHousehold(Long id);
    List<Household> getAllHouseholds();
    Household updateHousehold(Household household);
    boolean deleteHousehold(Long id);
}
