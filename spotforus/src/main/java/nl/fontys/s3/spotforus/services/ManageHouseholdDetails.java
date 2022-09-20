package nl.fontys.s3.spotforus.services;

import nl.fontys.s3.spotforus.entities.HouseholdDetails;

public interface ManageHouseholdDetails {
    HouseholdDetails addHouseholdDetails(HouseholdDetails householdDetails);
    HouseholdDetails getHouseholdDetails(Long id);
    HouseholdDetails updateHouseholdDetails(HouseholdDetails householdDetails);
    boolean deleteHouseholdDetails(Long id);
}
