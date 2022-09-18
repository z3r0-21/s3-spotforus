package nl.fontys.s3.spotforus.entities;

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
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @NotNull(message = "Post code is required")
    private String postcode;

    @NotNull(message = "House number is required")
    private Integer houseNumber;

    private String houseName;

    private String details;

}
