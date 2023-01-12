package nl.fontys.s3.spotforus.services.impl;

import nl.fontys.s3.spotforus.entities.Household;
import nl.fontys.s3.spotforus.entities.JoinCode;
import nl.fontys.s3.spotforus.entities.Task;
import nl.fontys.s3.spotforus.entities.User;
import nl.fontys.s3.spotforus.enums.CalendarTaskType;
import nl.fontys.s3.spotforus.repositories.HouseholdRepository;
import nl.fontys.s3.spotforus.services.HouseholdService;
import nl.fontys.s3.spotforus.services.JoinCodeService;
import nl.fontys.s3.spotforus.services.TaskService;
import nl.fontys.s3.spotforus.services.UserService;
import nl.fontys.s3.spotforus.utils.DataUtils;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class HouseholdServiceImpl implements HouseholdService {

    private final HouseholdRepository householdRepository;
    private final JoinCodeService joinCodeService;
    private final UserService userService;
    private final TaskService taskService;


    public HouseholdServiceImpl(
            HouseholdRepository householdRepository,
            JoinCodeService joinCodeService,
            UserService userService,
            TaskService taskService){
        this.householdRepository = householdRepository;
        this.joinCodeService = joinCodeService;
        this.userService = userService;
        this.taskService = taskService;
    }

    @Override
    public Household addHousehold(Household household) {
        List<JoinCode> joinCodes = joinCodeService.createCodes(household.getHouseholdSettings().getMaxTenants(), household);
        household.setJoinCodes(joinCodes);
        return householdRepository.save(household);
    }

    @Override
    public Household getHousehold(Long id) {
        Optional<Household> optional = householdRepository.findById(id);
        return optional.orElse(null);
    }

    @Override
    public List<Household> getAllHouseholds() {
        return householdRepository.findAll();
    }

    @Override
    public boolean deleteHousehold(Long id) {
        if(getHousehold(id) != null){
            householdRepository.deleteById(id);
            return true;
        }
        else {
            return false;
        }
    }

    @Override
    public Household addTenant(String tenantId, Long joinCodeId) {
        JoinCode jc = joinCodeService.getJoinCode(joinCodeId);
        User tenant = userService.getUser(tenantId);
        Household household = jc.getHousehold();

        if(!jc.isUsed() && !jc.isLeftHousehold() && tenant != null){
            jc.setUsed(true);
            jc.setTenant(tenant);
            tenant.setHousehold(household);
            household.getTenants().add(tenant);
            return householdRepository.save(household);
        }
        else {
            return null;
        }
    }

    @Override
    public Household removeTenant(String tenantId, Long householdId) {
        JoinCode jc = joinCodeService.getCurrentJoinCodeByTenant(tenantId, householdId);
        User tenant = userService.getUser(tenantId);
        Household household = this.getHousehold(householdId);

        if(jc != null && household.getTenants().contains(tenant)){
            tenant.setHousehold(null);
            jc.setLeftHousehold(true);
            return householdRepository.save(household);
        }
        else {
            return null;
        }
    }

    @Override
    public List<Task> generateWeeklySchedule(Long householdId, int weekNr, int year) {
        Household household = getHousehold(householdId);

        if(!household.getTenants().isEmpty()){
            DataUtils utils = new DataUtils();

            List<User> tenants = household.getTenants();
            List<Task> tasks = new ArrayList<>();
            Date[] weekDays = utils.getDaysInWeek(year, weekNr);

            //determine number of tasks based on settings
            int bathroomTasks = household.getHouseholdSettings().getBathrooms();
            int kitchenTasks = household.getHouseholdSettings().getKitchens();
            int otherRoomsTasks = household.getHouseholdSettings().getOtherRooms();
            int trashTasks = household.getHouseholdSettings().getTrashCans();

            //generate tasks
            for (int i = 0; i < bathroomTasks; i++) {
                Task newTask = new Task();
                newTask.setType(CalendarTaskType.BATHROOM);
                if(i % 2 == 0){
                    newTask.setDueDate(weekDays[5]);
                }
                else{
                    newTask.setDueDate(weekDays[6]);
                }
                tasks.add(newTask);
            }

            for (int i = 0; i < kitchenTasks; i++) {
                Task newTask = new Task();
                newTask.setType(CalendarTaskType.KITCHEN);
                if(i % 2 == 0){
                    newTask.setDueDate(weekDays[6]);
                }
                else{
                    newTask.setDueDate(weekDays[5]);
                }
                tasks.add(newTask);
            }

            for (int i = 0; i < otherRoomsTasks; i++) {
                Task newTask = new Task();
                newTask.setType(CalendarTaskType.OTHER_ROOM);
                if(i % 2 == 0){
                    newTask.setDueDate(weekDays[5]);
                }
                else{
                    newTask.setDueDate(weekDays[6]);
                }
                tasks.add(newTask);
            }

            for (int i = 0; i < trashTasks; i++) {
                Task newTask = new Task();
                newTask.setType(CalendarTaskType.TRASH);
                if(i % 2 == 0){
                    newTask.setDueDate(weekDays[5]);
                }
                else{
                    newTask.setDueDate(weekDays[6]);
                }
                tasks.add(newTask);
            }

            //create enough user objects to be assigned to the generated tasks
            while(tasks.size() > tenants.size()){
                tenants.addAll(tenants);
            }
            // code block to be executed

            //shuffle
            Collections.shuffle(tasks);
            Collections.shuffle(tenants);

            //assign tasks
            for (int i = 0; i < tasks.size(); i++) {
                tasks.get(i).setAssignee(tenants.get(i));
                taskService.addTask(tasks.get(i));
            }

            return tasks;
        }
        else{
            return Collections.emptyList();
        }
    }
}
