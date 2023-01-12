package nl.fontys.s3.spotforus.UnitTests.services;

import nl.fontys.s3.spotforus.entities.Household;
import nl.fontys.s3.spotforus.entities.HouseholdSettings;
import nl.fontys.s3.spotforus.entities.Task;
import nl.fontys.s3.spotforus.entities.User;
import nl.fontys.s3.spotforus.enums.CalendarTaskType;
import nl.fontys.s3.spotforus.repositories.HouseholdRepository;
import nl.fontys.s3.spotforus.repositories.TaskRepository;
import nl.fontys.s3.spotforus.services.TaskService;
import nl.fontys.s3.spotforus.services.impl.HouseholdServiceImpl;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.hibernate.validator.internal.util.Contracts.assertNotNull;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class HouseholdServiceScheduleTest {
    @Mock
    HouseholdRepository householdRepository;

    @Mock
    TaskService taskService;

    @InjectMocks
    HouseholdServiceImpl householdService;

    @BeforeEach
    void setUp() {
        List<User> tenants = new ArrayList<>();
        tenants.add(new User());
        tenants.add(new User());
        tenants.add(new User());
        tenants.add(new User());

        Household household = new Household();
        household.setTenants(tenants);
        household.setHouseholdSettings(HouseholdSettings.builder().id(1L).build());
        household.getHouseholdSettings().setBathrooms(2);
        household.getHouseholdSettings().setKitchens(2);
        household.getHouseholdSettings().setOtherRooms(2);
        household.getHouseholdSettings().setTrashCans(2);
        household.getHouseholdSettings().setMaxTenants(20);

        when(householdRepository.findById(1L)).thenReturn(Optional.of(household));
    }

    @Test
    void testGenerateWeeklySchedule() {
        when(taskService.addTask(any())).thenReturn(any());

        int weekNr = 1;
        int year = 2023;
        long householdId = 1;
        List<Task> tasks = householdService.generateWeeklySchedule(householdId, weekNr, year);
        assertEquals(8, tasks.size());
    }

    @Test
    void testGenerateWeeklyScheduleWhenNoTenant() {
        int weekNr = 1;
        int year = 2023;
        long householdId = 1;
        Household household = householdService.getHousehold(1L);
        household.setTenants(new ArrayList<>());

        List<Task> tasks = householdService.generateWeeklySchedule(householdId, weekNr, year);
        assertNull(tasks);
    }

    @Test
    void testTaskAssignments() {
        int weekNr = 1;
        int year = 2023;
        long householdId = 1;
        List<Task> tasks = householdService.generateWeeklySchedule(householdId, weekNr, year);
        for (Task task : tasks) {
            assertNotNull(task.getAssignee());
        }
    }

}
