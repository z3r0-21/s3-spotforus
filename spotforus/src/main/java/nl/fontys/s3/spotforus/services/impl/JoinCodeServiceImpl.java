package nl.fontys.s3.spotforus.services.impl;

import nl.fontys.s3.spotforus.entities.JoinCode;
import nl.fontys.s3.spotforus.entities.User;
import nl.fontys.s3.spotforus.repositories.JoinCodeRepository;
import nl.fontys.s3.spotforus.services.JoinCodeService;
import nl.fontys.s3.spotforus.services.UserService;
import org.hibernate.mapping.Join;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class JoinCodeServiceImpl implements JoinCodeService {

    private final JoinCodeRepository joinCodeRepository;

    public JoinCodeServiceImpl(JoinCodeRepository joinCodeRepository){
        this.joinCodeRepository = joinCodeRepository;
    }

    @Override
    public JoinCode getJoinCode(Long id) {
        Optional<JoinCode> optional = joinCodeRepository.findById(id);
        return optional.orElse(null);
    }

    @Override
    public JoinCode getJoinCodeByTenant(String tenantId) {
        Optional<JoinCode> optional = joinCodeRepository.findByTenant(tenantId);
        return optional.orElse(null);
    }

    @Override
    public List<JoinCode> getAllJoinCodes() {
        return joinCodeRepository.findAll();
    }

    @Override
    public List<JoinCode> getAllJoinCodesByHousehold(Long householdId) {
        List<JoinCode> joinCodes = new ArrayList<>();
        for (JoinCode jc : this.getAllJoinCodes()) {
            if(jc.getHousehold().getId().equals(householdId)){
                joinCodes.add(jc);
            }
        }
        return joinCodes;
    }

    @Override
    public List<JoinCode> getAllActiveJoinCodesByHousehold(Long householdId) {
        List<JoinCode> joinCodes = new ArrayList<>();
        for (JoinCode jc : this.getAllJoinCodes()) {
            if(jc.getHousehold().getId().equals(householdId) && !jc.isUsed()){
                joinCodes.add(jc);
            }
        }
        return joinCodes;
    }

    @Override
    public List<JoinCode> getAllInActiveJoinCodesByHousehold(Long householdId) {
        List<JoinCode> joinCodes = new ArrayList<>();
        for (JoinCode jc : this.getAllJoinCodes()) {
            if((jc.getHousehold().getId().equals(householdId)) && (jc.isUsed())){
                joinCodes.add(jc);
            }
        }
        return joinCodes;
    }

    @Override
    public List<JoinCode> createCodes(Integer codesNeeded) {
        List<JoinCode> newCodes = new ArrayList<>();

        for (int i = 0; i < codesNeeded; i++){
            newCodes.add(joinCodeRepository.save(new JoinCode()));
        }

        return newCodes;
    }
}
