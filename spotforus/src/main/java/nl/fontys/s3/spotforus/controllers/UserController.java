package nl.fontys.s3.spotforus.controllers;

import nl.fontys.s3.spotforus.dtos.JoinCodeDto;
import nl.fontys.s3.spotforus.dtos.UserDto;
import nl.fontys.s3.spotforus.entities.User;
import nl.fontys.s3.spotforus.enums.CalendarTaskType;
import nl.fontys.s3.spotforus.services.UserService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.List;
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    private final ModelMapper modelMapper = new ModelMapper();

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable String id) {
        User user = userService.getUser(id);

        if(user != null){
            UserDto dto = modelMapper.map(user, UserDto.class);
            return ResponseEntity.ok(dto);
        }
        else{
            return null;
        }
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<User> users = userService.getAllUsers();

        if(!users.isEmpty()){
            Type listType = new TypeToken<List<User>>() {}.getType();
            List<UserDto> dtos = modelMapper.map(users, listType);
            return ResponseEntity.ok(dtos);
        }
        else{
            return null;
        }
    }

    @PostMapping("/add")
    public ResponseEntity<UserDto> addUser(@RequestBody UserDto userDto){
        User user = modelMapper.map(userDto, User.class);
        UserDto dto = modelMapper.map(userService.addUser(user), UserDto.class);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id){
        if(userService.deleteUser(id)){
            return ResponseEntity.ok("Deleted!");
        }
        else {
            return null;
        }
    }
}
