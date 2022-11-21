package nl.fontys.s3.spotforus.UnitTests.services;

import nl.fontys.s3.spotforus.entities.User;
import nl.fontys.s3.spotforus.repositories.UserRepository;
import nl.fontys.s3.spotforus.services.impl.UserServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    UserRepository userRepository;

    @InjectMocks
    UserServiceImpl userService;

    @Test
    void addUser_shouldReturnUser(){
        User user = User.builder().id("1L").build();

        userService.addUser(user);

        verify(userRepository, times(1)).save(user);
    }

    @Test
    void getAllUsers_shouldReturnUsersArray(){
        User user1 = User.builder().id("1").build();
        User user2 = User.builder().id("2").build();
        when(userRepository.findAll()).thenReturn(List.of(user1, user2));

        Assertions.assertEquals(List.of(user1, user2), userService.getAllUsers());
    }

    @Test
    void getUserById_shouldReturnUser(){
        User user = User.builder().id("1").build();
        when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));

        Assertions.assertEquals(user, userService.getUser(user.getId()));
        verify(userRepository, times(1)).findById(user.getId());
    }

    @Test
    void getUserByNullId_shouldThrowException(){
        User user = User.builder().id(null).build();
        when(userRepository.findById(null)).thenThrow(IllegalArgumentException.class);

        Assertions.assertThrows(IllegalArgumentException.class,
            ()->{
                userService.getUser(user.getId());
            });
        verify(userRepository, times(0)).save(null);
    }

    @Test
    void updateUserByIdWithNullId_shouldReturnNull(){
        User user = User.builder().id(null).build();
        when(userRepository.findById(user.getId())).thenReturn(Optional.empty());

        Assertions.assertNull(userService.updateUser(user));
        verify(userRepository, times(0)).save(user);
    }

    @Test
    void updateUserByIdWithNullUser_shouldThrowException(){
        Assertions.assertThrows(NullPointerException.class,
            ()->{
                userService.updateUser(null);
            });
        verify(userRepository, times(0)).save(null);

    }

    @Test
    void deleteUserById_shouldReturnTrue(){
        //todo
    }

    @Test
    void deleteUserByNullId_shouldThrowException(){
        when(userRepository.findById(null)).thenThrow(IllegalArgumentException.class);

        Assertions.assertThrows(IllegalArgumentException.class,
                ()->{
                    userService.deleteUser(null);
                });
        verify(userRepository, times(0)).deleteById(null);
    }

    @Test
    void deleteNonExistingUser_shouldReturnFalse(){
        when(userRepository.findById("1")).thenReturn(Optional.empty());

        Assertions.assertFalse(userService.deleteUser("1"));
        verify(userRepository, times(0)).deleteById(null);
    }
}
