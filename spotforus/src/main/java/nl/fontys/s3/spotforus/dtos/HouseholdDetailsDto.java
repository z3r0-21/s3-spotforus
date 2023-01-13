package nl.fontys.s3.spotforus.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nl.fontys.s3.spotforus.entities.Household;

@NoArgsConstructor
@Getter
@Setter
public class HouseholdDetailsDto {
    private Long id;
    private String postcode;
    private Integer houseNumber;
    private String houseName;
    private String details;
    private Household household;

}
