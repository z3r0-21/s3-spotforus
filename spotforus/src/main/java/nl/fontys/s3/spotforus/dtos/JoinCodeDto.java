package nl.fontys.s3.spotforus.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nl.fontys.s3.spotforus.entities.Household;
import nl.fontys.s3.spotforus.entities.User;

@NoArgsConstructor
@Getter
@Setter
public class JoinCodeDto {
    public Long code;
    public boolean used;
    public boolean leftHousehold;
    public Household household;
    public User tenant;
}
