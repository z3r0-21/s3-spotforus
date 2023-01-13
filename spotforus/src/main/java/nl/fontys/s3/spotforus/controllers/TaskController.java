package nl.fontys.s3.spotforus.controllers;

import nl.fontys.s3.spotforus.dtos.TaskDto;
import nl.fontys.s3.spotforus.entities.Task;
import nl.fontys.s3.spotforus.services.HouseholdService;
import nl.fontys.s3.spotforus.services.TaskService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.List;
@CrossOrigin(origins= {"*"}, maxAge = 4800, allowCredentials = "false" )
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final HouseholdService householdService;
    private final TaskService taskService;

    private final ModelMapper modelMapper = new ModelMapper();

    public TaskController(HouseholdService householdService, TaskService taskService) {
        this.householdService = householdService;
        this.taskService = taskService;
    }

    @PostMapping("/generateSchedue/{householdId}/{year}/{weekNr}")
    public ResponseEntity<List<TaskDto>> generateWeeklySchedule(
            @PathVariable("householdId") Long householdId,
            @PathVariable("year") int year,
            @PathVariable("weekNr") int weekNr){
        List<Task> tasks = householdService.generateWeeklySchedule(householdId, weekNr, year);

        Type listType = new TypeToken<List<Task>>() {}.getType();
        List<TaskDto> dtos = modelMapper.map(tasks, listType);
        return ResponseEntity.ok(dtos);
    }

    @PostMapping("/add")
    public ResponseEntity<TaskDto> addTask(@RequestBody TaskDto taskDto){
        Task task = modelMapper.map(taskDto, Task.class);
        TaskDto dto = modelMapper.map(taskService.addTask(task), TaskDto.class);
        return ResponseEntity.ok(dto);
    }
}
