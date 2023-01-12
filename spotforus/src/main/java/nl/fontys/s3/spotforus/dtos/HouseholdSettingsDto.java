package nl.fontys.s3.spotforus.dtos;

import lombok.*;


@NoArgsConstructor
@Getter
@Setter
public class HouseholdSettingsDto {
    private Long id;
    private Integer maxTenants;
    private Integer bathrooms;
    private Integer kitchens;
    private Integer trashCans;
    private Integer otherRooms;
}
