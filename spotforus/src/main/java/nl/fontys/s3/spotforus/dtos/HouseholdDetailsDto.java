package nl.fontys.s3.spotforus.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class HouseholdDetailsDto {
    public Long id;
    public String postcode;
    public Integer houseNumber;
    public String houseName;
    public String details;
}
