package nl.fontys.s3.spotforus.services;

import nl.fontys.s3.spotforus.entities.Announcement;

import java.util.List;

public interface AnnouncementService {
    Announcement addAnnouncement(Announcement announcement);
    Announcement getAnnouncement(Long id);
    List<Announcement> getAnnouncementsPerHousehold(Long householdId);
    List<Announcement> getAllAnnouncements();
    Announcement updateAnnouncement(Announcement announcement);
    boolean deleteAnnouncement(Long id);

}
