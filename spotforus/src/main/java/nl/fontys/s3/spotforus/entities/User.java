package nl.fontys.s3.spotforus.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    @Id
    private String id;

    private String username;

    private String email;

    private boolean admin;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference(value="household-tenants")
    private Household household;

    @OneToMany(mappedBy = "tenant", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value="tenant-joinCodes")
    private List<JoinCode> joinCodes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value="user-announcements")
    private List<Announcement> announcements = new ArrayList<>();
}
