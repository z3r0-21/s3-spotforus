package nl.fontys.s3.spotforus.dtos;

import lombok.*;
import nl.fontys.s3.spotforus.entities.Household;


@NoArgsConstructor
@Getter
@Setter
public class HouseholdSettingsDto {
    public Long id;
    public Integer maxTenants;
    public Integer bathrooms;
    public Integer toilets;
    public Integer kitchens;
    public Integer livingRooms;
    public Integer trashCans;
}
