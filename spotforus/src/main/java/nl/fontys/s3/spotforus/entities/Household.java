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
@Getter
@Setter
public class Household {
    @Id
    @GeneratedValue(generator="household_seq")
    @SequenceGenerator(name="household_seq",sequenceName="household_seq", allocationSize=1)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id")
    @JsonManagedReference(value="household-householdDetails")
    private HouseholdDetails householdDetails;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id")
    @JsonManagedReference(value="household-householdSettings")
    private HouseholdSettings householdSettings;

    @OneToMany(mappedBy = "household", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value="household-tenants")
    private List<User> tenants = new ArrayList<>();

    @OneToMany(mappedBy = "household", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value="household-joinCodes")
    private List<JoinCode> joinCodes = new ArrayList<>();

    @OneToMany(mappedBy = "household", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value="household-announcements")
    private List<Announcement> announcements = new ArrayList<>();
    public Household(Long id) {
        this.id = id;
    }
}
