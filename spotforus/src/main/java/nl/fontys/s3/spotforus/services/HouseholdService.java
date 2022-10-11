package nl.fontys.s3.spotforus.services;

import nl.fontys.s3.spotforus.entities.Household;
import nl.fontys.s3.spotforus.entities.JoinCode;

import java.util.List;

public interface HouseholdService {
    Household addHousehold(Household household);
    Household getHousehold(Long id);
    List<Household> getAllHouseholds();
    boolean deleteHousehold(Long id);
    Household addTenant(String tenantId, Long joinCode);
    Household removeTenant(String tenantId, Long householdId);
}
