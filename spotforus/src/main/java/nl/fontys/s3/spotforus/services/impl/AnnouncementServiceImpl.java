package nl.fontys.s3.spotforus.services.impl;

import nl.fontys.s3.spotforus.entities.Announcement;
import nl.fontys.s3.spotforus.repositories.AnnouncementRepository;
import nl.fontys.s3.spotforus.services.AnnouncementService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AnnouncementServiceImpl implements AnnouncementService {
    private final AnnouncementRepository repository;

    public AnnouncementServiceImpl(AnnouncementRepository repository){
        this.repository = repository;
    }

    @Override
    public Announcement addAnnouncement(Announcement announcement) {
        return repository.save(announcement);
    }

    @Override
    public Announcement getAnnouncement(Long id) {
        Optional<Announcement> announcement = repository.findById(id);
        return announcement.orElse(null);
    }

    @Override
    public List<Announcement> getAnnouncementsPerHousehold(Long householdId) {
        return repository.findAllByHouseholdId(householdId);
    }

    @Override
    public List<Announcement> getAllAnnouncements() {
        return repository.findAll();
    }

    @Override
    public Announcement updateAnnouncement(Announcement announcement) {
        if(getAnnouncement(announcement.getId()) != null){
            return repository.save(announcement);
        }
        else {
            return null;
        }
    }

    @Override
    public boolean deleteAnnouncement(Long id) {
        if(getAnnouncement(id) != null){
            repository.deleteById(id);
            return true;
        }
        else {
            return false;
        }
    }
}
