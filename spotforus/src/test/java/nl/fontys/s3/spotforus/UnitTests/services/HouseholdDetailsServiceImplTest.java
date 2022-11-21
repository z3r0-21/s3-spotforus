package nl.fontys.s3.spotforus.UnitTests.services;

import nl.fontys.s3.spotforus.entities.HouseholdDetails;
import nl.fontys.s3.spotforus.repositories.HouseholdDetailsRepository;
import nl.fontys.s3.spotforus.services.impl.HouseholdDetailsServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class HouseholdDetailsServiceImplTest {
    @Mock
    HouseholdDetailsRepository householdDetailsRepository;

    @InjectMocks
    HouseholdDetailsServiceImpl householdDetailsService;

    @Test
    public void updateHouseholdDetails_shouldReturnHouseholdDetails(){
        HouseholdDetails householdDetails = HouseholdDetails.builder().id(1L).postcode("1111AC").build();
        when(householdDetailsRepository.findById(1L)).thenReturn(Optional.ofNullable(householdDetails));

        assert householdDetails != null;
        householdDetailsService.updateHouseholdDetails(householdDetails);

        verify(householdDetailsRepository, times(1)).save(householdDetails);
    }

    @Test
    public void updateHouseholdDetailsWithNull_shouldThrowException(){
        Assertions.assertThrows(NullPointerException.class,
            ()->{
                householdDetailsService.updateHouseholdDetails(null);
            });
    }
}
