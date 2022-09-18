package nl.fontys.s3.spotforus.controllers;

import jdk.javadoc.doclet.Reporter;
import nl.fontys.s3.spotforus.dtos.HouseholdDto;
import nl.fontys.s3.spotforus.entities.Household;
import nl.fontys.s3.spotforus.services.ManageHousehold;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/household")
@CrossOrigin("*")
public class HouseholdController {

    private final ManageHousehold manageHousehold;

//    private final ModelMapper modelMapper = new ModelMapper();

    public HouseholdController(ManageHousehold manageHousehold) {
        this.manageHousehold = manageHousehold;
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Household> getHouseholdById(@PathVariable  Long id) {
        Optional<Household> optionalHousehold = manageHousehold.getHousehold(id);
        return optionalHousehold.map(ResponseEntity::ok).orElse(null);
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<Household>> getAllHouseholds() {
        return ResponseEntity.ok(manageHousehold.getAllHouseholds());
    }

    @PostMapping("/add")
    public Household addHousehold(@RequestBody Household household){
        return manageHousehold.addHousehold(household);
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