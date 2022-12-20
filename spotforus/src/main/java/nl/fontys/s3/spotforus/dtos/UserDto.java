package nl.fontys.s3.spotforus.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nl.fontys.s3.spotforus.entities.Announcement;
import nl.fontys.s3.spotforus.entities.Household;
import nl.fontys.s3.spotforus.entities.JoinCode;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class UserDto {
    public String id;
    public String username;
    public String email;
    public boolean admin;
    public Household household;
    public List<JoinCode> joinCodes;
    public List<Announcement> announcements;
}
