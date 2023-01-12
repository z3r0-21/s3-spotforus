package nl.fontys.s3.spotforus.UnitTests.services;

import nl.fontys.s3.spotforus.entities.Task;
import nl.fontys.s3.spotforus.entities.User;
import nl.fontys.s3.spotforus.enums.CalendarTaskStatus;
import nl.fontys.s3.spotforus.enums.CalendarTaskType;
import nl.fontys.s3.spotforus.repositories.TaskRepository;
import nl.fontys.s3.spotforus.services.TaskService;
import nl.fontys.s3.spotforus.services.impl.TaskServiceImpl;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TaskServiceImplTest {
    @Mock
    TaskRepository taskRepository;

    @InjectMocks
    TaskServiceImpl taskService;
    private Task task;
    @BeforeEach
    public void setup(){
        task = Task.builder()
                .id(1L)
                .assignee(new User())
                .type(CalendarTaskType.BATHROOM)
                .status(CalendarTaskStatus.ToBeCompleted)
                .build();
        when(taskRepository.save(task)).thenReturn(task);
    }

    @Test
    public void testCompleteTaskOnTime() {
        task.setDueDate(Date.from(Instant.now().plusSeconds(3600)));

        Task completedTask = taskService.completeTask(task);

        assertEquals(CalendarTaskStatus.Completed, completedTask.getStatus());
        verify(taskRepository).save(completedTask);
    }

    @Test
    public void testCompleteTaskLate() {
        task.setDueDate(Date.from(Instant.now().minusSeconds(3600)));

        Task completedTask = taskService.completeTask(task);

        assertEquals(CalendarTaskStatus.CompletedLate, completedTask.getStatus());
        verify(taskRepository).save(completedTask);
    }

    @Test
    public void testCompleteTaskOnDueDate() {
        task.setDueDate(Date.from(Instant.now()));

        Task completedTask = taskService.completeTask(task);

        assertEquals(CalendarTaskStatus.Completed, completedTask.getStatus());
        verify(taskRepository).save(completedTask);
    }
}
