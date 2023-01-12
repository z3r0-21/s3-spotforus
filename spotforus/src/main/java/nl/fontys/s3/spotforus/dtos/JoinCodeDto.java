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
    private Long code;
    private boolean used;
    private boolean leftHousehold;
    private Household household;
    private User tenant;
}
