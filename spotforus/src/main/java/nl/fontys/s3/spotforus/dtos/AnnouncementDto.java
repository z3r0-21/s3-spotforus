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
    private Long id;
    private String content;
    private AnnouncementType type;
    private boolean admin;
    private User user;
    private Household household;
}
