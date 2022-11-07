package nl.fontys.s3.spotforus.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nl.fontys.s3.spotforus.entities.Household;
import nl.fontys.s3.spotforus.entities.User;
import nl.fontys.s3.spotforus.enums.AnnouncementType;

@NoArgsConstructor
@Getter
@Setter
public class AnnouncementDto {
    public Long id;
    public String content;
    public AnnouncementType type;
    public boolean admin;
    public User user;
    public Household household;
}
