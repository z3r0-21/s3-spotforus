package nl.fontys.s3.spotforus.services;

import nl.fontys.s3.spotforus.entities.User;

import java.util.List;

public interface UserService {
    User addUser(User user);
    User getUser(String id);
    List<User> getAllUsers();
    User updateUser(User user);
    boolean deleteUser(String id);

}
