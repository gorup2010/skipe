package com.chatapp.skipe.configuration;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.DelegatingFilterProxy;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
public class WebSecurityConfig {

    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // @Bean
    // CorsConfigurationSource corsConfigurationSource() {
    //     CorsConfiguration configuration = new CorsConfiguration();
    //     configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
    //     configuration.setAllowedMethods(Arrays.asList("GET", "POST", "OPTIONS", "DELETE", "PUT", "PATCH"));         // Allow all HTTP methods
    //     configuration.setAllowedHeaders(Arrays.asList("*"));
    //     configuration.setExposedHeaders(Arrays.asList("*"));
    //     configuration.setAllowCredentials(true);
    //     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    //     source.registerCorsConfiguration("/**", configuration);
    //     return source;
    // }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(customizer -> customizer.disable())
                .authorizeHttpRequests(request -> request
                        .requestMatchers("login", "register", "logout-success")
                        .permitAll()
                        .anyRequest().authenticated())
                .logout(logout -> logout.logoutSuccessUrl("/logout-success"))       // If logging out success, redirect to logout-success
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                .build();
    }

    @Bean
    AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setPasswordEncoder(passwordEncoder());
        authProvider.setUserDetailsService(userDetailsService);
        return authProvider;
    }

    // @Bean
    // public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
    //         throws Exception {
    //     return authenticationConfiguration.getAuthenticationManager();
    // }

}
