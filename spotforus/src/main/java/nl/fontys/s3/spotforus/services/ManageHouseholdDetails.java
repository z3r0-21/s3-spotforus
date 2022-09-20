package nl.fontys.s3.spotforus.services;

import nl.fontys.s3.spotforus.entities.HouseholdDetails;
import nl.fontys.s3.spotforus.entities.HouseholdSettings;

public interface ManageHouseholdDetails {
    HouseholdDetails updateHouseholdDetails(HouseholdDetails householdDetails);
    //todo: get by id (when the user wants to refresh only some of the data)

}
