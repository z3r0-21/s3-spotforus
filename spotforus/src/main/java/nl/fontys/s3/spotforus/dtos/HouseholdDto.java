package nl.fontys.s3.spotforus.dtos;

import lombok.*;
import nl.fontys.s3.spotforus.entities.HouseholdDetails;
import nl.fontys.s3.spotforus.entities.HouseholdSettings;

@NoArgsConstructor
@Getter
@Setter
public class HouseholdDto {
    public Long id;
    public HouseholdDetails householdDetails;
    public HouseholdSettings householdSettings;
}
