package nl.fontys.s3.spotforus.controllers;

import nl.fontys.s3.spotforus.dtos.HouseholdDetailsDto;
import nl.fontys.s3.spotforus.dtos.HouseholdDto;
import nl.fontys.s3.spotforus.entities.Household;
import nl.fontys.s3.spotforus.entities.HouseholdDetails;
import nl.fontys.s3.spotforus.services.ManageHouseholdDetails;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/householdDetails")
public class HouseholdDetailsController {
    private final ManageHouseholdDetails manageHouseholdDetails;

    private final ModelMapper modelMapper = new ModelMapper();

    public HouseholdDetailsController(ManageHouseholdDetails manageHouseholdDetails) {
        this.manageHouseholdDetails = manageHouseholdDetails;
    }

    @PutMapping("/update")
    public ResponseEntity<HouseholdDetailsDto> updateHouseholdDetails(@RequestBody HouseholdDetailsDto householdDetailsDto){
        HouseholdDetails householdDetails = modelMapper.map(householdDetailsDto, HouseholdDetails.class);
        HouseholdDetailsDto dto = modelMapper.map(manageHouseholdDetails.updateHouseholdDetails(householdDetails), HouseholdDetailsDto.class);
        return ResponseEntity.ok(dto);
    }
}
