package nl.fontys.s3.spotforus.controllers;

import nl.fontys.s3.spotforus.services.ManageHouseholdSettings;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/householdSettings")
public class HouseholdSettingsController {
    private final ManageHouseholdSettings manageHouseholdSettings;

    private final ModelMapper modelMapper = new ModelMapper();

    public HouseholdSettingsController(ManageHouseholdSettings manageHouseholdSettings) {
        this.manageHouseholdSettings = manageHouseholdSettings;
    }
}
