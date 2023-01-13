package nl.fontys.s3.spotforus.controllers;

import nl.fontys.s3.spotforus.dtos.HouseholdDetailsDto;
import nl.fontys.s3.spotforus.entities.HouseholdDetails;
import nl.fontys.s3.spotforus.services.HouseholdDetailsService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins= {"*"}, maxAge = 4800, allowCredentials = "false" )
@RestController
@RequestMapping("/api/householdDetails")
public class HouseholdDetailsController {
    private final HouseholdDetailsService householdDetailsService;

    private final ModelMapper modelMapper = new ModelMapper();

    public HouseholdDetailsController(HouseholdDetailsService householdDetailsService) {
        this.householdDetailsService = householdDetailsService;
    }

    @PutMapping("/update")
    public ResponseEntity<HouseholdDetailsDto> updateHouseholdDetails(@RequestBody HouseholdDetailsDto householdDetailsDto){
        HouseholdDetails householdDetails = modelMapper.map(householdDetailsDto, HouseholdDetails.class);
        HouseholdDetailsDto dto = modelMapper.map(householdDetailsService.updateHouseholdDetails(householdDetails), HouseholdDetailsDto.class);
        return ResponseEntity.ok(dto);
    }
}
