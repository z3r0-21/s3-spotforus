package nl.fontys.s3.spotforus.entities;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import nl.fontys.s3.spotforus.enums.CalendarTaskStatus;
import nl.fontys.s3.spotforus.enums.CalendarTaskType;

import javax.persistence.*;
import java.util.Date;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Task {
    @Id
    @GeneratedValue(generator="task_seq")
    @SequenceGenerator(name="task_seq",sequenceName="task_seq", allocationSize=1)
    private Long id;
    private Date dueDate;
    private CalendarTaskType type;
    private CalendarTaskStatus status = CalendarTaskStatus.ToBeCompleted;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference(value="user-tasks")
    private User assignee;
}
