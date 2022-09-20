package nl.fontys.s3.spotforus.services;

import nl.fontys.s3.spotforus.entities.Household;
import nl.fontys.s3.spotforus.entities.HouseholdSettings;

public interface ManageHouseholdSettings {
    HouseholdSettings updateHouseholdSettings(HouseholdSettings householdSettings);

}
