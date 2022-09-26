package nl.fontys.s3.spotforus.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "household_settings")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class HouseholdSettings {
    @Id
    @GeneratedValue(generator="householdSettings_seq")
    @SequenceGenerator(name="householdSettings_seq",sequenceName="householdSettings_seq", allocationSize=1)
    private Long id;

    private Integer bathrooms;

    private Integer toilets;

    private Integer kitchens;

    private Integer livingRooms;

    private Integer trashCans;

    @OneToOne(mappedBy = "householdSettings", cascade = CascadeType.ALL)
    @JsonBackReference
    private Household household;
}
