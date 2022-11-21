package nl.fontys.s3.spotforus.UnitTests.services;

import nl.fontys.s3.spotforus.entities.Announcement;
import nl.fontys.s3.spotforus.entities.Household;
import nl.fontys.s3.spotforus.repositories.AnnouncementRepository;
import nl.fontys.s3.spotforus.services.impl.AnnouncementServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AnnouncementServiceImplTest {
    @Mock
    AnnouncementRepository announcementRepository;

    @InjectMocks
    AnnouncementServiceImpl announcementService;

    @Test
    public void addAnnouncement_shouldReturnNewAnnouncement(){
        Announcement announcement = new Announcement();
        when(announcementRepository.save(announcement)).thenReturn(announcement);

        Announcement result = announcementService.addAnnouncement(announcement);

        Assertions.assertEquals(announcement, result);
    }

    @Test
    public void getAnnouncementById_shouldReturnAnnouncement(){
        Announcement announcement = Announcement.builder().id(1L).build();
        when(announcementRepository.findById(1L)).thenReturn(Optional.ofNullable(announcement));

        Announcement result = announcementService.getAnnouncement(1L);

        Assertions.assertEquals(announcement, result);
    }

    @Test
    public void getAnnouncementById_shouldNotReturnAnnouncement(){
        when(announcementRepository.findById(1L)).thenReturn(Optional.empty());

        Announcement result = announcementService.getAnnouncement(1L);

        Assertions.assertNull(result);
    }

    @Test
    public void getAllAnnouncement_shouldReturnArray(){
        List<Announcement> announcements = List.of(new Announcement(), new Announcement());
        when(announcementRepository.findAll()).thenReturn(announcements);

        List<Announcement> result = announcementService.getAllAnnouncements();

        Assertions.assertEquals(announcements, result);
    }

    @Test
    public void getAnnouncementsByHouseholdId_shouldReturnAnnouncementsArray(){
        Household household = Household.builder().id(1L).build();
        Announcement announcement1 = Announcement.builder().id(1L).household(household).build();
        Announcement announcement2 = Announcement.builder().id(2L).household(household).build();
        when(announcementRepository.findAllByHouseholdId(1L)).thenReturn(List.of(announcement1, announcement2));

        List<Announcement> result = announcementService.getAnnouncementsPerHousehold(1L);

        Assertions.assertEquals(List.of(announcement1, announcement2), result);
    }

    @Test
    public void updateAnnouncement_shouldReturnUpdatedAnnouncement(){
        Announcement announcement = Announcement.builder().id(1L).content("text").build();
        when(announcementRepository.save(announcement)).thenReturn(announcement);

        Announcement result = announcementService.updateAnnouncement(announcement);

        Assertions.assertEquals("text", result.getContent());
    }
}
