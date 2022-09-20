package nl.fontys.s3.spotforus.dtos;

import lombok.*;
import nl.fontys.s3.spotforus.entities.HouseholdDetails;
import nl.fontys.s3.spotforus.entities.HouseholdSettings;

@NoArgsConstructor
@Getter
public class HouseholdDto {
    Long id;
    HouseholdDetails householdDetails;
    HouseholdSettings householdSettings;
}
