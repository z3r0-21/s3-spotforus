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
public class JoinCode {
    @Id
    @GeneratedValue(generator="household_seq")
    @SequenceGenerator(name="joinCodes_seq",sequenceName="joinCodes_seq", allocationSize=1000)
    private Long code;

    private boolean isUsed = false;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference(value="household-joinCodes")
    private Household household;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private User tenant;

}
