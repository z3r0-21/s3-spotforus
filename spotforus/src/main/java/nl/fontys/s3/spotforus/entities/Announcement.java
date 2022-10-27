package nl.fontys.s3.spotforus.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import nl.fontys.s3.spotforus.enums.AnnouncementType;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Announcement {
    @Id
    @GeneratedValue(generator="announcement_seq")
    @SequenceGenerator(name="announcement_seq",sequenceName="announcement_seq", allocationSize=1)
    private Long id;
    private String content;
    private AnnouncementType type;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference(value="user-announcements")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference(value="household-announcements")
    private Household household;
}
