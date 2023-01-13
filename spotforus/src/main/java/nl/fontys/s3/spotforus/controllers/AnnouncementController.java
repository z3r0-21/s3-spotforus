package nl.fontys.s3.spotforus.controllers;

import nl.fontys.s3.spotforus.dtos.AnnouncementDto;
import nl.fontys.s3.spotforus.entities.Announcement;
import nl.fontys.s3.spotforus.services.AnnouncementService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.List;
@CrossOrigin(origins= {"*"}, maxAge = 4800, allowCredentials = "false" )
@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {
    private final AnnouncementService announcementService;

    private final ModelMapper modelMapper = new ModelMapper();

    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<AnnouncementDto> getAnnouncementById(@PathVariable Long id) {
        Announcement announcement = announcementService.getAnnouncement(id);

        if(announcement != null){
            AnnouncementDto dto = modelMapper.map(announcement, AnnouncementDto.class);
            return ResponseEntity.ok(dto);
        }
        else{
            return null;
        }
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<AnnouncementDto>> getAllAnnouncements() {
        List<Announcement> announcements = announcementService.getAllAnnouncements();

        if(!announcements.isEmpty()){
            Type listType = new TypeToken<List<Announcement>>() {}.getType();
            List<AnnouncementDto> dtos = modelMapper.map(announcements, listType);
            return ResponseEntity.ok(dtos);
        }
        else{
            return null;
        }
    }

    @GetMapping("/get/perHousehold/{householdId}")
    public ResponseEntity<List<AnnouncementDto>> getAnnouncementPerHousehold(@PathVariable Long householdId) {
        List<Announcement> announcements = announcementService.getAnnouncementsPerHousehold(householdId);

        if(announcements != null){
            Type listType = new TypeToken<List<Announcement>>() {}.getType();
            List<AnnouncementDto> dtos = modelMapper.map(announcements, listType);
            return ResponseEntity.ok(dtos);
        }
        else{
            return null;
        }
    }

    @PostMapping("/add")
    public ResponseEntity<AnnouncementDto> addAnnouncement(@RequestBody AnnouncementDto announcementDto){
        Announcement announcement = modelMapper.map(announcementDto, Announcement.class);
        AnnouncementDto dto = modelMapper.map(announcementService.addAnnouncement(announcement), AnnouncementDto.class);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAnnouncement(@PathVariable Long id){
        if(announcementService.deleteAnnouncement(id)){
            return ResponseEntity.ok("Deleted!");
        }
        else {
            return null;
        }
    }
}
