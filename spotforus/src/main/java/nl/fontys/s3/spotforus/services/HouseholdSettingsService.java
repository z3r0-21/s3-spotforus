package nl.fontys.s3.spotforus.services;

import nl.fontys.s3.spotforus.entities.HouseholdSettings;

public interface HouseholdSettingsService {
    HouseholdSettings updateHouseholdSettings(HouseholdSettings householdSettings);
    //todo: get by id (when the user wants to refresh only some of the data)
}
