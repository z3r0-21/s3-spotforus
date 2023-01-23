package nl.fontys.s3.spotforus.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
public class SecurityConfig {

    @Value("${auth0.audience}")
    private String audience;

    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    private String issuer;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .mvcMatchers("/api/announcements/get/all").hasAuthority("SCOPE_crud:all")
                .mvcMatchers("/api/announcements/get/{id}").hasAuthority("SCOPE_crud:all")
                .mvcMatchers("/api/household/get/all").hasAuthority("SCOPE_crud:all")
                .mvcMatchers("/api/household/add").hasAuthority("SCOPE_crud:all")
                .mvcMatchers("/api/household/delete").hasAuthority("SCOPE_crud:all")
                .mvcMatchers("/api/householdDetails/update").hasAuthority("SCOPE_crud:all")
                .mvcMatchers("/api/householdSettings/update").hasAuthority("SCOPE_crud:all")
                .mvcMatchers("/api/users/get/all").hasAuthority("SCOPE_crud:all")
//                .mvcMatchers("/api/tasks/add").hasAuthority("SCOPE_crud:all")
                .mvcMatchers("/api/tasks/generateSchedue/**").hasAuthority("SCOPE_crud:all")
                .mvcMatchers("/api/tasks/delete").hasAuthority("SCOPE_crud:all")
                .mvcMatchers("/api/users/delete").hasAuthority("SCOPE_crud:all")
                .mvcMatchers("/api/users/changeAdminStatus").hasAuthority("SCOPE_crud:all")
                .mvcMatchers("/api/users/delete").hasAuthority("SCOPE_crud:all")
                .antMatchers("/api/**").authenticated()
//                .antMatchers("/api/**").permitAll()

                .and().cors()
                .and().oauth2ResourceServer().jwt();

        http.csrf().disable();

        return http.build();
    }


    @Bean
    JwtDecoder jwtDecoder() {
        NimbusJwtDecoder jwtDecoder = (NimbusJwtDecoder)
                JwtDecoders.fromOidcIssuerLocation(issuer);

        OAuth2TokenValidator<Jwt> audienceValidator = new AudienceValidator(audience);
        OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuer);
        OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<>(withIssuer, audienceValidator);

        jwtDecoder.setJwtValidator(withAudience);

        return jwtDecoder;
    }
}