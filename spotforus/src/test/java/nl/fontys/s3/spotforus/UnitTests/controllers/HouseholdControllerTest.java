package nl.fontys.s3.spotforus.UnitTests.controllers;

import nl.fontys.s3.spotforus.controllers.HouseholdController;
import nl.fontys.s3.spotforus.dtos.HouseholdDto;
import nl.fontys.s3.spotforus.entities.Household;
import nl.fontys.s3.spotforus.entities.HouseholdDetails;
import nl.fontys.s3.spotforus.entities.HouseholdSettings;
import nl.fontys.s3.spotforus.entities.JoinCode;
import nl.fontys.s3.spotforus.services.HouseholdService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class HouseholdControllerTest {
    @Mock
    HouseholdService householdService;

    @InjectMocks
    HouseholdController householdController;

    HouseholdSettings householdSettings;
    HouseholdDetails householdDetails;
    private Household household;
    private JoinCode jc1;
    private JoinCode jc2;

    @BeforeEach
    void setUp(){
        HouseholdSettings householdSettings = HouseholdSettings.builder()
                .id(1L)
                .bathrooms(1)
                .kitchens(1)
                .maxTenants(3)
                .otherRooms(2)
                .otherRooms(2)
                .build();

        HouseholdDetails householdDetails = HouseholdDetails.builder()
                .id(1L)
                .details("")
                .houseNumber(100)
                .postcode("1111AC")
                .houseName("House name")
                .build();
        household = Household.builder()
                .id(1L)
                .householdDetails(householdDetails)
                .householdSettings(householdSettings)
                .build();
        jc1 = JoinCode.builder()
                .code(1000L)
                .leftHousehold(false)
                .used(false)
                .household(household)
                .build();
        jc2 = JoinCode.builder()
                .code(1001L)
                .leftHousehold(false)
                .used(false)
                .household(household)
                .build();
        household.setJoinCodes(List.of(jc1, jc2));
    }

    @Test
    void getHouseholdById_existingHousehold() {
        when(householdService.getHousehold(1L)).thenReturn(household);

        Household result = householdService.getHousehold(1L);
        ResponseEntity<HouseholdDto> response = householdController.getHouseholdById(1L);
        Assertions.assertNotNull(response.getBody());
        Assertions.assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void getHouseholdById_nonExistingHousehold() {
        when(householdService.getHousehold(2L)).thenReturn(null);

        ResponseEntity<HouseholdDto> response = householdController.getHouseholdById(2L);

        Assertions.assertNull(response.getBody());
        Assertions.assertEquals(422, response.getStatusCodeValue());
    }

    @Test
    void getAllHouseholds_existingHouseholds() {
        when(householdService.getAllHouseholds()).thenReturn(List.of(household));

        ResponseEntity<List<HouseholdDto>> response = householdController.getAllHouseholds();

        Assertions.assertFalse(response.getBody().isEmpty());
        Assertions.assertEquals(200, response.getStatusCodeValue());
        Assertions.assertEquals(household, response.getBody().get(0));
    }

    @Test
    void getAllHouseholds_noHouseholds() {
        when(householdService.getAllHouseholds()).thenReturn(Collections.emptyList());

        ResponseEntity<List<HouseholdDto>> response = householdController.getAllHouseholds();

        Assertions.assertNull(response.getBody());
        Assertions.assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    void deleteHousehold_existingHousehold() {
        when(householdService.deleteHousehold(1L)).thenReturn(true);

        ResponseEntity<String> response = householdController.deleteHousehold(1L);

        Assertions.assertEquals("Deleted!", response.getBody());
        Assertions.assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void deleteHousehold_nonExistingHousehold() {
        when(householdService.deleteHousehold(1L)).thenReturn(false);

        ResponseEntity<String> response = householdController.deleteHousehold(1L);

        Assertions.assertEquals(
                "Could not delete household with ID 1. Make sure the ID is correct and try again.",
                response.getBody());
        Assertions.assertEquals(422, response.getStatusCodeValue());
    }

//    void removeTenant
    //add
    //add tenant
    //remove tenant
}
