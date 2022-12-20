package nl.fontys.s3.spotforus.services.impl;

import nl.fontys.s3.spotforus.entities.HouseholdDetails;
import nl.fontys.s3.spotforus.repositories.HouseholdDetailsRepository;
import nl.fontys.s3.spotforus.services.HouseholdDetailsService;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

@Service
public class HouseholdDetailsServiceImpl implements HouseholdDetailsService {
    private final HouseholdDetailsRepository householdDetailsRepository;

    public HouseholdDetailsServiceImpl(HouseholdDetailsRepository householdDetailsRepository){
        this.householdDetailsRepository = householdDetailsRepository;
    }

    @Override
    public HouseholdDetails updateHouseholdDetails(@NotNull HouseholdDetails newHouseholdDetails) {
        if(householdDetailsRepository.findById(newHouseholdDetails.getId()).isPresent()){
            return householdDetailsRepository.save(newHouseholdDetails);
        }
        else{
            return null;
        }
    }
}
