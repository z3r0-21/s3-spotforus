package nl.fontys.s3.spotforus.dtos;

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
    private String id;
    private String username;
    private String email;
    private boolean admin;
    private Household household;
    private List<JoinCode> joinCodes;
    private List<Announcement> announcements;
}
