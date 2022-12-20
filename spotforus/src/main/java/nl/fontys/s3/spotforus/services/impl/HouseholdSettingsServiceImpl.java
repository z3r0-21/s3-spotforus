package nl.fontys.s3.spotforus.services.impl;


import nl.fontys.s3.spotforus.entities.HouseholdSettings;
import nl.fontys.s3.spotforus.repositories.HouseholdSettingsRepository;
import nl.fontys.s3.spotforus.services.HouseholdSettingsService;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

@Service
public class HouseholdSettingsServiceImpl implements HouseholdSettingsService {
    private final HouseholdSettingsRepository householdSettingsRepository;

    public HouseholdSettingsServiceImpl(HouseholdSettingsRepository householdSettingsRepository){
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
