package nl.fontys.s3.spotforus.services;

import nl.fontys.s3.spotforus.entities.Household;

import java.util.List;

public interface ManageHousehold {
    Household addHousehold(Household household);
    Household getHousehold(Long id);
    List<Household> getAllHouseholds();
    boolean deleteHousehold(Long id);
}
