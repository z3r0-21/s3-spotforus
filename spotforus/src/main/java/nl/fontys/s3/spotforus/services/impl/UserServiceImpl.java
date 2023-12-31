package nl.fontys.s3.spotforus.services.impl;

import nl.fontys.s3.spotforus.entities.User;
import nl.fontys.s3.spotforus.repositories.UserRepository;
import nl.fontys.s3.spotforus.services.UserService;
import org.hibernate.Hibernate;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }
    @Override
    public User changeAdminStatus(String id) {
        User user = this.getUser(id);
        user.setAdmin(!user.isAdmin());
        return userRepository.save(user);
    }

    @Override
    public User getUser(String id) {
        Optional<User> optional = userRepository.findById(id);
        return optional.map(user -> Hibernate.unproxy(user, User.class)).orElse(null);
    }
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(@NotNull User user) {
        if(userRepository.findById(user.getId()).isPresent()){
            return userRepository.save(user);
        }
        else{
            return null;
        }
    }

    @Override
    public boolean deleteUser(String id) {
        if(getUser(id) != null){
            userRepository.deleteById(id);
            return true;
        }
        else {
            return false;
        }
    }
}
