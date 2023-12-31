package nl.fontys.s3.spotforus.UnitTests.services;

import nl.fontys.s3.spotforus.entities.Household;
import nl.fontys.s3.spotforus.entities.JoinCode;
import nl.fontys.s3.spotforus.entities.User;
import nl.fontys.s3.spotforus.repositories.JoinCodeRepository;
import nl.fontys.s3.spotforus.services.impl.JoinCodeServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class JoinCodeServiceImplTest {
    @Mock
    JoinCodeRepository joinCodeRepository;

    @InjectMocks
    JoinCodeServiceImpl joinCodeService;

    @Test
    void createJoinCodesTest() {
        int codesNeeded = 5;
        assertEquals(codesNeeded, joinCodeService.createCodes(codesNeeded, new Household()).size());
    }

    @Test
    void getAllJoinCodesTest() {
        List<JoinCode> joinCodes = new ArrayList<>() {
            {
                add(new JoinCode());
                add(new JoinCode());
            } };
        when(joinCodeRepository.findAll()).thenReturn(joinCodes);

        List<JoinCode> result = joinCodeService.getAllJoinCodes();
        assertEquals(joinCodes, result);
    }

    @Test
    void getAllJoinCodesByHousehold() {
        Household household1 = Household.builder().id(1L).build();
        Household household2 = Household.builder().id(2L).build();
        JoinCode jc1 = JoinCode.builder().household(household1).build();
        JoinCode jc2 = JoinCode.builder().household(household2).build();
        when(joinCodeRepository.findAll()).thenReturn(List.of(jc1, jc2));

        List<JoinCode> result = joinCodeService.getAllJoinCodesByHousehold(1L);

        assertEquals(1, result.size());
        assertEquals(jc1, result.get(0));
    }

    @Test
    void getAllJoinCodesByHouseholdTest() {
        Household household = new Household();
        Household household2 = new Household();
        household.setId(1L);
        household2.setId(2L);

        JoinCode jc1 = new JoinCode();
        JoinCode jc2 = new JoinCode();
        JoinCode jc3 = new JoinCode();
        JoinCode jc4 = new JoinCode();

        jc1.setHousehold(household);
        jc2.setHousehold(household);
        jc3.setHousehold(household2);
        jc4.setHousehold(household2);

        household.setJoinCodes(List.of(jc1, jc2));
        household2.setJoinCodes(List.of(jc3, jc4));


        when(joinCodeRepository.findAll()).thenReturn(List.of(jc1, jc2, jc3, jc4));
        List<JoinCode> result = joinCodeService.getAllActiveJoinCodesByHousehold(1L);
        assertEquals(List.of(jc1, jc2), result);
    }

    @Test
    void getAllInactiveJoinCodesByHouseholdTest() {
        Household household = new Household();
        Household household2 = new Household();
        household.setId(1L);
        household2.setId(2L);

        JoinCode jc1 = new JoinCode();
        JoinCode jc2 = new JoinCode();
        JoinCode jc3 = new JoinCode();

        jc1.setHousehold(household);
        jc1.setLeftHousehold(true);
        jc1.setUsed(true);
        jc2.setHousehold(household);
        jc2.setLeftHousehold(true);
        jc2.setUsed(true);
        jc3.setHousehold(household2);
        jc3.setLeftHousehold(false);
        jc3.setUsed(false);

        household.setJoinCodes(List.of(jc1, jc2, jc3));

        when(joinCodeRepository.findAll()).thenReturn(List.of(jc1, jc2, jc3));
        List<JoinCode> result = joinCodeService.getAllInActiveJoinCodesByHousehold(1L);
        assertEquals(List.of(jc1, jc2), result);
    }

    @Test
    void getAllJoinCodesByHouseholdEmptyArrayTest() {
        Household household = new Household();
        Household household2 = new Household();
        household.setId(1L);
        household2.setId(2L);

        JoinCode jc1 = new JoinCode();
        JoinCode jc2 = new JoinCode();
        JoinCode jc3 = new JoinCode();
        JoinCode jc4 = new JoinCode();
        jc1.setHousehold(household2);
        jc2.setHousehold(household2);
        jc3.setHousehold(household2);
        jc4.setHousehold(household2);

        when(joinCodeRepository.findAll()).thenReturn(List.of(jc1, jc2, jc3, jc4));

        List<JoinCode> result = joinCodeService.getAllActiveJoinCodesByHousehold(1L);
        assertEquals(0, result.size());
    }

    @Test
    void getJoinCodesByIdTest() {
        JoinCode jc = new JoinCode();
        jc.setCode(1L);
        when(joinCodeRepository.findById(1L)).thenReturn(Optional.of(jc));
        JoinCode result = joinCodeService.getJoinCode(1L);
        assertEquals(jc, result);
    }

    @Test
    void getActiveJoinCodeByTenantId_shouldReturnJc() {
        Household household = Household.builder().id(1L).build();
        User tenant = User.builder().id("1L").household(household).build();
        JoinCode jc1 = JoinCode.builder().code(1L).household(household).used(true).tenant(tenant).build();
        JoinCode jc2 = JoinCode.builder().code(2L).household(household).build();
        JoinCode jc3 = JoinCode.builder().code(3L).household(household).build();
        tenant.setJoinCodes(List.of(jc1));

        when(joinCodeRepository.findAll()).thenReturn(List.of(jc1, jc2, jc3));

        assertEquals(jc1, joinCodeService.getCurrentJoinCodeByTenant(tenant.getId(), household.getId()));
    }
    @Test
    void getActiveJoinCodeByTenantId_shouldReturnNull(){
        Household household = Household.builder().id(1L).build();
        User tenant = User.builder().id("1L").household(household).build();
        JoinCode jc1 = JoinCode.builder().code(1L).household(household).used(true).tenant(tenant).build();
        JoinCode jc2 = JoinCode.builder().code(2L).household(household).build();
        JoinCode jc3 = JoinCode.builder().code(3L).household(household).build();
        tenant.setJoinCodes(List.of(jc1));

        when(joinCodeRepository.findAll()).thenReturn(List.of(jc1, jc2, jc3));

        assertNull(joinCodeService.getCurrentJoinCodeByTenant("2L", household.getId()));
    }

    @Test
    void getActiveJoinCodeByTenantIdUnusedCode_shouldReturnNull(){
        Household household = Household.builder().id(1L).build();
        User tenant = User.builder().id("1L").household(household).build();
        JoinCode jc1 = JoinCode.builder().code(1L).household(household).used(false).tenant(tenant).build();
        JoinCode jc2 = JoinCode.builder().code(2L).household(household).build();
        JoinCode jc3 = JoinCode.builder().code(3L).household(household).build();
        tenant.setJoinCodes(List.of(jc1));

        when(joinCodeRepository.findAll()).thenReturn(List.of(jc1, jc2, jc3));

        assertNull(joinCodeService.getCurrentJoinCodeByTenant("2L", household.getId()));
    }

    @Test
    void getActiveJoinCodeByTenantIdLeftHousehold_shouldReturnNull(){
        Household household = Household.builder().id(1L).build();
        User tenant = User.builder().id("1L").household(household).build();
        JoinCode jc1 = JoinCode.builder().code(1L).household(household).used(true).leftHousehold(true).tenant(tenant).build();
        JoinCode jc2 = JoinCode.builder().code(2L).household(household).build();
        JoinCode jc3 = JoinCode.builder().code(3L).household(household).build();
        tenant.setJoinCodes(List.of(jc1));

        when(joinCodeRepository.findAll()).thenReturn(List.of(jc1, jc2, jc3));

        assertNull(joinCodeService.getCurrentJoinCodeByTenant("2L", household.getId()));
    }
}
