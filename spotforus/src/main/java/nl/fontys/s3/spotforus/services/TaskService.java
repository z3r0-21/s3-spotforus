package nl.fontys.s3.spotforus.services;

import nl.fontys.s3.spotforus.entities.Task;

public interface TaskService {
    Task addTask(Task task);
    Task getTask(Long id);
    Task completeTask(Task task);
//    Task markNotCompleted(Task task);
    boolean deleteTask(Long id);
}
