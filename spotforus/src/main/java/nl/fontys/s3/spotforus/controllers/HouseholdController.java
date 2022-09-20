package nl.fontys.s3.spotforus.controllers;

import nl.fontys.s3.spotforus.dtos.HouseholdDto;
import nl.fontys.s3.spotforus.entities.Household;
import nl.fontys.s3.spotforus.services.ManageHousehold;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/household")
public class HouseholdController {

    private final ManageHousehold manageHousehold;

    private final ModelMapper modelMapper = new ModelMapper();

    public HouseholdController(ManageHousehold manageHousehold) {
        this.manageHousehold = manageHousehold;
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<HouseholdDto> getHouseholdById(@PathVariable  Long id) {
        Household household = manageHousehold.getHousehold(id);

        if(household != null){
            HouseholdDto dto = modelMapper.map(household, HouseholdDto.class);
            return ResponseEntity.ok(dto);
        }
        else{
            return null;
        }
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<HouseholdDto>> getAllHouseholds() {
        List<Household> households = manageHousehold.getAllHouseholds();

        if(!households.isEmpty()){
            Type listType = new TypeToken<List<Household>>() {}.getType();
            List<HouseholdDto> dtos = modelMapper.map(households, listType);
            return ResponseEntity.ok(dtos);
        }
        else{
            return null;
        }
    }

    @PostMapping("/add")
    public ResponseEntity<HouseholdDto> addHousehold(@RequestBody HouseholdDto householdDto){
        Household household = modelMapper.map(householdDto, Household.class);
        HouseholdDto dto = modelMapper.map(manageHousehold.addHousehold(household), HouseholdDto.class);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteHousehold(@PathVariable Long id){
        if(manageHousehold.deleteHousehold(id)){
            return ResponseEntity.ok("Deleted!");
        }
        else {
            return null;
        }
    }
}