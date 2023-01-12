package nl.fontys.s3.spotforus.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nl.fontys.s3.spotforus.entities.User;
import nl.fontys.s3.spotforus.enums.CalendarTaskStatus;
import nl.fontys.s3.spotforus.enums.CalendarTaskType;
import java.util.Date;

@NoArgsConstructor
@Getter
@Setter
public class TaskDto {
    private Long id;
    private Date dueDate;
    private CalendarTaskType type;
    private CalendarTaskStatus status;
    private User assignee;
}
