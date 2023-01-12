package nl.fontys.s3.spotforus.dtos;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nl.fontys.s3.spotforus.entities.User;
import nl.fontys.s3.spotforus.enums.CalendarTaskStatus;
import nl.fontys.s3.spotforus.enums.CalendarTaskType;

import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import java.util.Date;

@NoArgsConstructor
@Getter
@Setter
public class TaskDto {
    public Long id;
    public Date dueDate;
    public CalendarTaskType type;
    public CalendarTaskStatus status;
    public User assignee;
}
