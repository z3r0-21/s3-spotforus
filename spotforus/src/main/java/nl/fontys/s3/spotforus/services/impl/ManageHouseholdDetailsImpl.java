package nl.fontys.s3.spotforus.services.impl;

import nl.fontys.s3.spotforus.entities.HouseholdDetails;
import nl.fontys.s3.spotforus.repositories.HouseholdDetailsRepository;
import nl.fontys.s3.spotforus.services.ManageHouseholdDetails;
import org.springframework.stereotype.Service;

@Service
public class ManageHouseholdDetailsImpl implements ManageHouseholdDetails {
    private final HouseholdDetailsRepository householdDetailsRepository;

    public ManageHouseholdDetailsImpl(HouseholdDetailsRepository householdDetailsRepository){
        this.householdDetailsRepository = householdDetailsRepository;
    }

    @Override
    public HouseholdDetails updateHouseholdDetails(HouseholdDetails newHouseholdDetails) {
        if(householdDetailsRepository.findById(newHouseholdDetails.getId()).isPresent()){
//            HouseholdDetails householdDetails = householdDetailsRepository
//                    .getReferenceById(newHouseholdDetails.getId());
//
//            householdDetails.setDetails(newHouseholdDetails.getDetails());
//            householdDetails.setPostcode(newHouseholdDetails.getPostcode());
//            householdDetails.setHouseName(newHouseholdDetails.getHouseName());
//            householdDetails.setHouseNumber(newHouseholdDetails.getHouseNumber());
//            householdDetails.setHousehold(newHouseholdDetails.getHousehold());

            return householdDetailsRepository.save(newHouseholdDetails);
        }
        else{
            return null;
        }
    }
}
