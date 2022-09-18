package nl.fontys.s3.spotforus.services.impl;

import nl.fontys.s3.spotforus.entities.Household;
import nl.fontys.s3.spotforus.repositories.HouseholdRepository;
import nl.fontys.s3.spotforus.services.ManageHousehold;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ManageHouseholdImpl implements ManageHousehold {

    private final HouseholdRepository householdRepository;

    public ManageHouseholdImpl(HouseholdRepository householdRepository){
        this.householdRepository = householdRepository;
    }

    @Override
    public Household addHousehold(Household household) {
        return householdRepository.save(household);
    }

    @Override
    public Optional<Household> getHousehold(Long id) {
        return householdRepository.findById(id);
    }

    @Override
    public List<Household> getAllHouseholds() {
        return householdRepository.findAll();
    }

    @Override
    public Household updateHousehold(Household household) {
        return householdRepository.save(household);
    }

    @Override
    public boolean deleteHousehold(Long id) {
        if(getHousehold(id).isPresent()){
            householdRepository.deleteById(id);
            return true;
        }
        else {
            return false;
        }
    }
}
