package nl.fontys.s3.spotforus.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class HouseholdDetails {
    @Id
    @GeneratedValue(generator="householdDetails_seq")
    @SequenceGenerator(name="householdDetails_seq",sequenceName="householdDetails_seq", allocationSize=1)
    private Long id;

    private String postcode;

    private Integer houseNumber;

    private String houseName;

    private String details;

    @OneToOne(mappedBy = "householdDetails", cascade = CascadeType.ALL)
    @JsonBackReference(value="household-householdDetails")
    private Household household;
}
