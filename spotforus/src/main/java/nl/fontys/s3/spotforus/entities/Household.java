package nl.fontys.s3.spotforus.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

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
    @JoinColumn(name = "household_details_id", referencedColumnName = "id")
    @JsonManagedReference
    private HouseholdDetails householdDetails;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "household_settings_id", referencedColumnName = "id")
    @JsonManagedReference
    private HouseholdSettings householdSettings;

}
