package nl.fontys.s3.spotforus.dtos;

import lombok.*;
import nl.fontys.s3.spotforus.entities.HouseholdDetails;
import nl.fontys.s3.spotforus.entities.HouseholdSettings;
import nl.fontys.s3.spotforus.entities.JoinCode;
import nl.fontys.s3.spotforus.entities.User;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class HouseholdDto {
    private Long id;
    private HouseholdDetails householdDetails;
    private HouseholdSettings householdSettings;
    private List<User> tenants;
    private List<JoinCode> joinCodes;
}
