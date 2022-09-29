package nl.fontys.s3.spotforus.services.impl;


import nl.fontys.s3.spotforus.entities.HouseholdSettings;
import nl.fontys.s3.spotforus.repositories.HouseholdSettingsRepository;
import nl.fontys.s3.spotforus.services.ManageHouseholdSettings;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

@Service
public class ManageHouseholdSettingsImpl implements ManageHouseholdSettings {
    private final HouseholdSettingsRepository householdSettingsRepository;

    public ManageHouseholdSettingsImpl(HouseholdSettingsRepository householdSettingsRepository){
        this.householdSettingsRepository = householdSettingsRepository;
    }

    @Override
    public HouseholdSettings updateHouseholdSettings(@NotNull HouseholdSettings householdSettings) {
        if(householdSettingsRepository.findById(householdSettings.getId()).isPresent()){
            return householdSettingsRepository.save(householdSettings);
        }
        else{
            return null;
        }
    }
}
