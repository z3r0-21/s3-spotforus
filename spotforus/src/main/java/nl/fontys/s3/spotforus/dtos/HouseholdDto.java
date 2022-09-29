package nl.fontys.s3.spotforus.dtos;

import lombok.*;
import nl.fontys.s3.spotforus.entities.HouseholdDetails;
import nl.fontys.s3.spotforus.entities.HouseholdSettings;
import nl.fontys.s3.spotforus.entities.User;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class HouseholdDto {
    public Long id;
    public HouseholdDetails householdDetails;
    public HouseholdSettings householdSettings;
    public List<User> tenants;
}
