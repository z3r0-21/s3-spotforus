package nl.fontys.s3.spotforus.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nl.fontys.s3.spotforus.entities.Household;

@NoArgsConstructor
@Getter
@Setter
public class UserDTO {
    public String id;
    public String username;
    public String email;
    public boolean isAdmin;
    public Household household;
}
