package nl.fontys.s3.spotforus.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {
    @Id
    private String id;

    private String username;

    private String email;

    private boolean isAdmin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonManagedReference
    private Household household;

}
