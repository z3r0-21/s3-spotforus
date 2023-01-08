package nl.fontys.s3.spotforus.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import nl.fontys.s3.spotforus.enums.AnnouncementType;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    private boolean admin = false;
    private LocalDateTime created_on = LocalDateTime.now();

//    @ManyToOne(fetch = FetchType.EAGER)
//    @JsonManagedReference(value="user-announcements")
//    private User user;
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference(value="household-announcements")
    private Household household;
}