package nl.fontys.s3.spotforus.services;

import nl.fontys.s3.spotforus.entities.JoinCode;
import org.hibernate.mapping.Join;

import java.util.List;

public interface JoinCodeService {
    JoinCode getJoinCode(Long id);
    JoinCode getJoinCodeByTenant(String tenantId);
    List<JoinCode> getAllJoinCodes();
    List<JoinCode> getAllJoinCodesByHousehold(Long householdId);
    List<JoinCode> getAllActiveJoinCodesByHousehold(Long householdId);
    List<JoinCode> getAllInActiveJoinCodesByHousehold(Long householdId);
    List<JoinCode> createCodes(Integer codesNeeded);
}
