package com.vgintegradores.appvgintegradores.configuration;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import com.vgintegradores.appvgintegradores.services.DetalleUsuarioService;
@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {

    private DetalleUsuarioService detalleUsuarioService;

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(detalleUsuarioService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity)
        throws Exception{
        //Desabilitamos Cors con está intrucción
        httpSecurity.csrf(csrf -> csrf.disable())
                //Luego continua lo demás
                .authorizeHttpRequests(
                        auth ->
                                auth.requestMatchers("/auth/login",
                                        "/auth/registrar",
                                        "/auth/guardarusuario",
                                        "/resources/**",
                                        "/static/**",
                                        "/styles/**",
                                        "/scripts/**").permitAll()
                                        .anyRequest().authenticated()
                )
                .formLogin(
                        login ->
                                login.loginPage("/auth/login")
                                        .defaultSuccessUrl("/auth/login-success")
                                        .usernameParameter("nomusuario")
                                        .passwordParameter("password")

                )
                .authenticationProvider(authenticationProvider());
        return httpSecurity.build();
    }

}
