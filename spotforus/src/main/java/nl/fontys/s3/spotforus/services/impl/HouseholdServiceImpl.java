package nl.fontys.s3.spotforus.services.impl;

import nl.fontys.s3.spotforus.entities.Household;
import nl.fontys.s3.spotforus.repositories.HouseholdRepository;
import nl.fontys.s3.spotforus.services.HouseholdService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HouseholdServiceImpl implements HouseholdService {

    private final HouseholdRepository householdRepository;

    public HouseholdServiceImpl(HouseholdRepository householdRepository){
        this.householdRepository = householdRepository;
    }

    @Override
    public Household addHousehold(Household household) {
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
}
