package nl.fontys.s3.spotforus.services;

import nl.fontys.s3.spotforus.entities.Household;
import nl.fontys.s3.spotforus.entities.JoinCode;

import java.util.List;

public interface JoinCodeService {
    JoinCode getJoinCode(Long id);
    JoinCode getCurrentJoinCodeByTenant(String tenantId, Long householdId);
    List<JoinCode> getAllJoinCodes();
    List<JoinCode> getAllJoinCodesByHousehold(Long householdId);
    List<JoinCode> getAllActiveJoinCodesByHousehold(Long householdId);
    List<JoinCode> getAllInActiveJoinCodesByHousehold(Long householdId);
    List<JoinCode> createCodes(Integer codesNeeded, Household household);
}
