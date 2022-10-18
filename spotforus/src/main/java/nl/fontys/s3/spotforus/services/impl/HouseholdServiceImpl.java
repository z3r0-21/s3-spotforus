package nl.fontys.s3.spotforus.services.impl;

import nl.fontys.s3.spotforus.entities.Household;
import nl.fontys.s3.spotforus.entities.JoinCode;
import nl.fontys.s3.spotforus.entities.User;
import nl.fontys.s3.spotforus.repositories.HouseholdRepository;
import nl.fontys.s3.spotforus.services.HouseholdService;
import nl.fontys.s3.spotforus.services.JoinCodeService;
import nl.fontys.s3.spotforus.services.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HouseholdServiceImpl implements HouseholdService {

    private final HouseholdRepository householdRepository;
    private final JoinCodeService joinCodeService;
    private final UserService userService;

    public HouseholdServiceImpl(HouseholdRepository householdRepository, JoinCodeService joinCodeService, UserService userService){
        this.householdRepository = householdRepository;
        this.joinCodeService = joinCodeService;
        this.userService = userService;
    }

    @Override
    public Household addHousehold(Household household) {
        List<JoinCode> joinCodes = joinCodeService.createCodes(household.getHouseholdSettings().getMaxTenants(), household);
        household.setJoinCodes(joinCodes);
        return householdRepository.save(household);
    }

    @Override
    public Household getHousehold(Long id) {
        Optional<Household> optional = householdRepository.findById(id);
        return optional.orElse(null);
    }

    @Override
    public List<Household> getAllHouseholds() {
        return householdRepository.findAll();
    }

    @Override
    public boolean deleteHousehold(Long id) {
        if(getHousehold(id) != null){
            householdRepository.deleteById(id);
            return true;
        }
        else {
            return false;
        }
    }

    @Override
    public Household addTenant(String tenantId, Long joinCodeId) {
        JoinCode jc = joinCodeService.getJoinCode(joinCodeId);
        User tenant = userService.getUser(tenantId);
        Household household = jc.getHousehold();

        if(!jc.isUsed() && !jc.isLeftHousehold() && tenant != null){
            jc.setUsed(true);
            jc.setTenant(tenant);
            tenant.setHousehold(household);
            return householdRepository.save(household);
        }
        else {
            return null;
        }
    }

    @Override
    public Household removeTenant(String tenantId, Long householdId) {
        JoinCode jc = joinCodeService.getCurrentJoinCodeByTenant(tenantId, householdId);
        User tenant = userService.getUser(tenantId);
        Household household = this.getHousehold(householdId);

        if(jc != null){
            jc.setLeftHousehold(true);
            household.getTenants().remove(tenant);
            return householdRepository.save(household);
        }
        else {
            return null;
        }
    }
}
