package nl.fontys.s3.spotforus.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nl.fontys.s3.spotforus.entities.Household;

@NoArgsConstructor
@Getter
@Setter
public class JoinCodeDto {
    public Long code;
    public boolean isUsed;
    public Household household;
    public Household tenant;
}
