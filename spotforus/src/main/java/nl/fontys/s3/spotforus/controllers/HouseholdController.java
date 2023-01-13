package nl.fontys.s3.spotforus.controllers;

import nl.fontys.s3.spotforus.dtos.HouseholdDto;
import nl.fontys.s3.spotforus.entities.Household;
import nl.fontys.s3.spotforus.services.HouseholdService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.List;
@CrossOrigin(origins= {"*"}, maxAge = 4800, allowCredentials = "false" )
@RestController
@RequestMapping("/api/household")
public class HouseholdController {

    private final HouseholdService householdService;

    private final ModelMapper modelMapper = new ModelMapper();

    public HouseholdController(HouseholdService householdService) {
        this.householdService = householdService;
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<HouseholdDto> getHouseholdById(@PathVariable Long id) {
        Household household = householdService.getHousehold(id);

        if(household != null){
            HouseholdDto dto = modelMapper.map(household, HouseholdDto.class);
            return ResponseEntity.ok(dto);
        }
        else{
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<HouseholdDto>> getAllHouseholds() {
        List<Household> households = householdService.getAllHouseholds();

        if(!households.isEmpty()){
            Type listType = new TypeToken<List<Household>>() {}.getType();
            List<HouseholdDto> dtos = modelMapper.map(households, listType);
            return ResponseEntity.ok(dtos);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<HouseholdDto> addHousehold(@RequestBody HouseholdDto householdDto){
        Household household = modelMapper.map(householdDto, Household.class);
        HouseholdDto dto = modelMapper.map(householdService.addHousehold(household), HouseholdDto.class);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteHousehold(@PathVariable Long id){
        if(householdService.deleteHousehold(id)){
            return ResponseEntity.ok("Deleted!");
        }
        else {
            return new ResponseEntity<>(
            "Could not delete household with ID " + id + ". Make sure the ID is correct and try again.",
            HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @PutMapping("/addTenant/{userId}/{joinCodeId}")
    public ResponseEntity<HouseholdDto> addTenant(@PathVariable("userId") String userId, @PathVariable("joinCodeId") long joinCodeId) {
        HouseholdDto dto = modelMapper.map(householdService.addTenant(userId, joinCodeId), HouseholdDto.class);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/removeTenant/{userId}/{householdId}")
    public ResponseEntity<HouseholdDto> removeTenant(@PathVariable("userId") String userId, @PathVariable("householdId") long householdId) {
        HouseholdDto dto = modelMapper.map(householdService.removeTenant(userId, householdId), HouseholdDto.class);
        return ResponseEntity.ok(dto);
    }
}