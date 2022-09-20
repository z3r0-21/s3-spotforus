package nl.fontys.s3.spotforus.services;


import nl.fontys.s3.spotforus.entities.HouseholdSettings;

public interface ManageHouseholdSettings {
    HouseholdSettings addHouseholdSettings(HouseholdSettings householdSettings);
    HouseholdSettings getHouseholdSettings(Long id);
    HouseholdSettings updateHouseholdSettings(HouseholdSettings householdSettings);
    boolean deleteHouseholdDSettings(Long id);
}
