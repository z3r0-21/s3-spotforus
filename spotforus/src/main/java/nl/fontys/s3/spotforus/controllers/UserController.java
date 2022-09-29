package nl.fontys.s3.spotforus.controllers;

import nl.fontys.s3.spotforus.dtos.UserDto;
import nl.fontys.s3.spotforus.entities.User;
import nl.fontys.s3.spotforus.services.ManageUser;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.List;

public class UserController {
    private final ManageUser manageUser;

    private final ModelMapper modelMapper = new ModelMapper();

    public UserController(ManageUser manageUser) {
        this.manageUser = manageUser;
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable String id) {
        User user = manageUser.getUser(id);

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
        List<User> users = manageUser.getAllUsers();

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
        UserDto dto = modelMapper.map(manageUser.addUser(user), UserDto.class);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id){
        if(manageUser.deleteUser(id)){
            return ResponseEntity.ok("Deleted!");
        }
        else {
            return null;
        }
    }
}
