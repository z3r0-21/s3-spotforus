package nl.fontys.s3.spotforus.dtos;

import lombok.*;

@NoArgsConstructor
@Getter
public class HouseholdDto {
    Long id;
    String postcode;
    Integer houseNumber;
    String houseName;
    String details;
}