package nl.fontys.s3.spotforus.services.impl;

import nl.fontys.s3.spotforus.entities.JoinCode;
import nl.fontys.s3.spotforus.entities.User;
import nl.fontys.s3.spotforus.repositories.UserRepository;
import nl.fontys.s3.spotforus.services.JoinCodeService;
import nl.fontys.s3.spotforus.services.UserService;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final JoinCodeService joinCodeService;

    public UserServiceImpl(UserRepository userRepository, JoinCodeService joinCodeService){
        this.userRepository = userRepository;
        this.joinCodeService = joinCodeService;
    }

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUser(String id) {
        Optional<User> optional = userRepository.findById(id);
        return optional.orElse(null);
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

    @Override
    public User assignTenantToHouseHold(Long joinCode, String tenantId) {
        JoinCode jc = joinCodeService.getJoinCode(joinCode);
        User tenant = this.getUser(tenantId);
        if(!jc.isUsed() && tenant != null){
            jc.setTenant(tenant);
           //return joinCodeRepository.save(jc);
        }
        else {
            return null;
        }
        return null;

    }

    @Override
    public User unassignTenantToHouseHold(Long joinCode, String tenantId) {
        JoinCode jc = joinCodeService.getJoinCode(joinCode);
        if(!jc.isUsed() && jc.getTenant() != null){
            //todo - set isUsed to false
           // return joinCodeRepository.save(jc);
        }
        else {
            return null;
        }
        return null;

    }
}
