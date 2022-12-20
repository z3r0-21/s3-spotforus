package nl.fontys.s3.spotforus.UnitTests.services;

import nl.fontys.s3.spotforus.entities.HouseholdSettings;
import nl.fontys.s3.spotforus.repositories.HouseholdSettingsRepository;
import nl.fontys.s3.spotforus.services.impl.HouseholdSettingsServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class HouseholdSettingsImplTest {
    @Mock
    HouseholdSettingsRepository householdSettingsRepository;

    @InjectMocks
    HouseholdSettingsServiceImpl householdSettingsService;

    @Test
    void updateHouseholdSettings_shouldReturnHouseholdDetails(){
        HouseholdSettings householdSettings = HouseholdSettings.builder().id(1L).build();
        when(householdSettingsRepository.findById(1L)).thenReturn(Optional.ofNullable(householdSettings));

        assert householdSettings != null;
        householdSettingsService.updateHouseholdSettings(householdSettings);

        verify(householdSettingsRepository, times(1)).save(householdSettings);
    }

    @Test
    void updateHouseholdDetailsWithNull_shouldThrowException(){
        Assertions.assertThrows(NullPointerException.class,
            ()->{
                householdSettingsService.updateHouseholdSettings(null);
            });
    }
}
