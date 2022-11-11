package nl.fontys.s3.spotforus.UnitTests.services;

import nl.fontys.s3.spotforus.entities.Household;
import nl.fontys.s3.spotforus.entities.JoinCode;
import nl.fontys.s3.spotforus.entities.User;
import nl.fontys.s3.spotforus.repositories.JoinCodeRepository;
import nl.fontys.s3.spotforus.services.impl.JoinCodeServiceImpl;
import org.hibernate.mapping.Join;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class JoinCodeServiceImplTest {
    @Mock
    JoinCodeRepository joinCodeRepository;

    @InjectMocks
    JoinCodeServiceImpl joinCodeService;

    @Test
    public void createJoinCodesTest() {
        int codesNeeded = 5;
        int result = joinCodeService.createCodes(codesNeeded, new Household()).size();
        assertEquals(codesNeeded, result);
    }

    @Test
    public void getAllJoinCodesTest() {
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
    public void getAllJoinCodesByHouseholdTest() {
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
    public void getAllJoinCodesByHouseholdEmptyArrayTest() {
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
        assertEquals(result.size(), 0);
    }

    @Test
    public void getJoinCodesByIdTest() {
        JoinCode jc = new JoinCode();
        jc.setCode(1L);
        when(joinCodeRepository.findById(1L)).thenReturn(Optional.of(jc));
        JoinCode result = joinCodeService.getJoinCode(1L);
        assertEquals(jc, result);
    }

    @Test
    public void getActiveJoinCodeByTenantIdTest() {
        Household household = new Household();
        household.setId(1L);

        User tenant = new User();
        tenant.setId("1L");
        tenant.setHousehold(household);

        JoinCode jc1 = new JoinCode();
        JoinCode jc2 = new JoinCode();
        JoinCode jc3 = new JoinCode();

        jc1.setCode(1L);
        jc1.setHousehold(household);
        jc1.setTenant(tenant);
        jc1.setUsed(true);
        jc2.setCode(2L);
        jc2.setHousehold(household);
        jc3.setCode(3L);
        jc3.setHousehold(household);

        List<JoinCode> joinCodes = Arrays.asList(jc1, jc2, jc3);
        tenant.setJoinCodes(List.of(jc1));

        when(joinCodeRepository.findAll()).thenReturn(joinCodes);

        JoinCode result = joinCodeService.getCurrentJoinCodeByTenant(tenant.getId(), household.getId());

        assertEquals(jc1, result);
    }


}
