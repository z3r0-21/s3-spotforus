package nl.fontys.s3.spotforus.services.impl;

import nl.fontys.s3.spotforus.entities.Task;
import nl.fontys.s3.spotforus.enums.CalendarTaskStatus;
import nl.fontys.s3.spotforus.repositories.TaskRepository;
import nl.fontys.s3.spotforus.services.TaskService;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository){
         this.taskRepository = taskRepository;
    }
    @Override
    public Task addTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public Task getTask(Long id) {
        Optional<Task> optional = taskRepository.findById(id);
        return optional.orElse(null);
    }

    @Override
    public Task completeTask(Task task) {
        Instant now = Instant.now();
        Date dtNow = Date.from(now);


        if(task.getDueDate().equals(dtNow) || task.getDueDate().after(dtNow)){
            task.setStatus(CalendarTaskStatus.Completed);
        }
        else{
            task.setStatus(CalendarTaskStatus.CompletedLate);
        }

        return taskRepository.save(task);
    }

    @Override
    public Task markNotCompleted(Task task) {
        task.setStatus(CalendarTaskStatus.NotCompleted);
        return taskRepository.save(task);
    }

    @Override
    public boolean deleteTask(Long id) {
        if(getTask(id) != null){
            taskRepository.deleteById(id);
            return true;
        }
        else {
            return false;
        }
    }
}
