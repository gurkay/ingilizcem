package com.template.backend.security;

import com.template.backend.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.web.filter.CorsFilter;
import org.springframework.http.HttpMethod;

import com.template.backend.security.jwt.AuthEntryPointJwt;
import com.template.backend.security.jwt.AuthTokenFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig { // extends WebSecurityConfigurerAdapter {
  @Autowired
  UserDetailsServiceImpl userDetailsService;

  @Autowired
  private AuthEntryPointJwt unauthorizedHandler;
  
  @Autowired
  private CorsFilter corsFilter;

  @Bean
  public AuthTokenFilter authenticationJwtTokenFilter() {
    return new AuthTokenFilter();
  }

  @Bean
  public DaoAuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

    authProvider.setUserDetailsService(userDetailsService);
    authProvider.setPasswordEncoder(passwordEncoder());

    return authProvider;
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public HttpFirewall defaultHttpFirewall() {
    return new DefaultHttpFirewall();
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .exceptionHandling(exceptionHandling -> exceptionHandling.authenticationEntryPoint(unauthorizedHandler))
        .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .headers(headers -> headers
            .frameOptions(frame -> frame.deny())
            .xssProtection(xss -> xss.disable())
        )
        .authorizeHttpRequests(authorize -> authorize
            // Allow OPTIONS requests for CORS preflight
            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
            .requestMatchers("/api/auth/**", "/auth/**", "/", "/error", "/actuator/**").permitAll()
            .requestMatchers("/api/lessons/findByLessonId/**").hasAnyRole("USER", "ADMIN", "MANAGER")
            .requestMatchers("/api/lessons/findByUserId/**").hasAnyRole("USER", "ADMIN", "MANAGER")
            .requestMatchers("/api/lessons/updateWordStatus/**").hasAnyRole("USER", "ADMIN", "MANAGER")
            .requestMatchers("/api/user-words/findByUserIdAndStatus/**").hasAnyRole("USER", "ADMIN", "MANAGER")
            .anyRequest().authenticated()
        )
        .csrf(csrf -> csrf.disable());  // Disable CSRF for REST APIs with JWT

    // Add the CORS filter before the security filter
    http.addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class);
    http.authenticationProvider(authenticationProvider());
    http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
}