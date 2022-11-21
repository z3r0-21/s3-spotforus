package nl.fontys.s3.spotforus.UnitTests.services;

import nl.fontys.s3.spotforus.entities.Household;
import nl.fontys.s3.spotforus.entities.HouseholdDetails;
import nl.fontys.s3.spotforus.entities.HouseholdSettings;
import nl.fontys.s3.spotforus.entities.User;
import nl.fontys.s3.spotforus.repositories.HouseholdRepository;
import nl.fontys.s3.spotforus.services.JoinCodeService;
import nl.fontys.s3.spotforus.services.UserService;
import nl.fontys.s3.spotforus.services.impl.HouseholdServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class HouseholdServiceImplTest {

    @Mock
    HouseholdRepository householdRepository;

    @Mock
    UserService userService;

    @Mock
    JoinCodeService joinCodeService;

    @InjectMocks
    HouseholdServiceImpl householdService;

    @Test
    void addHousehold_shouldReturnHousehold(){
        Household household = Household.builder().id(1L).householdSettings(new HouseholdSettings()).householdDetails(new HouseholdDetails()).build();
        when(householdRepository.save(household)).thenReturn(household);

        Assertions.assertEquals(household, householdService.addHousehold(household));
        verify(householdRepository, times(1)).save(household);
    }

    @Test
    void getAllHouseholds_shouldReturnHouseholdsArray(){
        Household household1 = Household.builder().id(1L).householdSettings(new HouseholdSettings()).householdDetails(new HouseholdDetails()).build();
        Household household2 = Household.builder().id(2L).householdSettings(new HouseholdSettings()).householdDetails(new HouseholdDetails()).build();
        when(householdRepository.findAll()).thenReturn(List.of(household1, household2));

        Assertions.assertEquals(List.of(household1, household2), householdService.getAllHouseholds());
    }

    @Test
    void getHouseholdById_shouldReturnHousehold(){
        Household household = Household.builder().id(1L).householdSettings(new HouseholdSettings()).householdDetails(new HouseholdDetails()).build();
        when(householdRepository.findById(household.getId())).thenReturn(Optional.of(household));

        Assertions.assertEquals(household, householdService.getHousehold(household.getId()));
        verify(householdRepository, times(1)).findById(household.getId());
    }

    @Test
    void getHouseholdByNullId_shouldThrowException(){
        when(householdRepository.findById(null)).thenThrow(IllegalArgumentException.class);

        Assertions.assertThrows(IllegalArgumentException.class,
                ()->{
                    householdService.getHousehold(null);
                });
        verify(householdRepository, times(0)).save(null);
    }

    @Test
    void deleteHouseholdById_shouldReturnTrue(){
        Household household = Household.builder().id(1L).householdSettings(new HouseholdSettings()).householdDetails(new HouseholdDetails()).build();
        when(householdRepository.findById(household.getId())).thenReturn(Optional.ofNullable(household));

        Assertions.assertTrue(householdService.deleteHousehold(household.getId()));
        verify(householdRepository, times(1)).deleteById(household.getId());
    }

    @Test
    void deleteHouseholdByNullId_shouldThrowException(){
        when(householdRepository.findById(null)).thenThrow(IllegalArgumentException.class);

        Assertions.assertThrows(IllegalArgumentException.class,
                ()->{
                    householdService.deleteHousehold(null);
                });
        verify(householdRepository, times(0)).deleteById(null);
    }

    @Test
    void deleteNonExistingHousehold_shouldReturnFalse(){
        when(householdRepository.findById(1L)).thenReturn(Optional.empty());

        Assertions.assertFalse(householdService.deleteHousehold(1L));
        verify(householdRepository, times(0)).deleteById(null);
    }
}
