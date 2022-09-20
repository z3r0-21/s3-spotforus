package nl.fontys.s3.spotforus.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import nl.fontys.s3.spotforus.entities.Household;

import javax.persistence.OneToOne;

@NoArgsConstructor
@Getter
public class HouseholdSettingsDto {
    Long id;
    Integer bathrooms;
    Integer toilets;
    Integer kitchens;
    Integer livingRooms;
    Integer trashCans;
}
