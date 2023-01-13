package nl.fontys.s3.spotforus.controllers;

import nl.fontys.s3.spotforus.dtos.HouseholdSettingsDto;
import nl.fontys.s3.spotforus.entities.HouseholdSettings;
import nl.fontys.s3.spotforus.services.HouseholdSettingsService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins= {"*"}, maxAge = 4800, allowCredentials = "false" )
@RestController
@RequestMapping("/api/householdSettings")
public class HouseholdSettingsController {
    private final HouseholdSettingsService householdSettingsService;

    private final ModelMapper modelMapper = new ModelMapper();

    public HouseholdSettingsController(HouseholdSettingsService householdSettingsService) {
        this.householdSettingsService = householdSettingsService;
    }

    @PutMapping("/update")
    public ResponseEntity<HouseholdSettingsDto> updateHouseholdSettings(@RequestBody HouseholdSettingsDto householdSettingsDto){
        HouseholdSettings householdSettings = modelMapper.map(householdSettingsDto, HouseholdSettings.class);
        HouseholdSettingsDto dto = modelMapper.map(householdSettingsService.updateHouseholdSettings(householdSettings), HouseholdSettingsDto.class);
        return ResponseEntity.ok(dto);
    }
}
