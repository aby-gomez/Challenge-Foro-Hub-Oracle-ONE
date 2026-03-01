package com.alura.foro_hub.infra.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration//anotacion de spring boot
@EnableWebSecurity //indica que omdificaremos spring security
public class SecurityConfiguration {
    @Bean//para encriptar la contraseña
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Este es el estándar de la industria
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        return http.csrf(csrf -> csrf.disable())//desabilitamos  ataques que utiliza cookies dle navegador , al  ya tener un sistema stateless estamos protegiso contra esos ataques
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(req -> {
                    req.requestMatchers(HttpMethod.POST, "/login").permitAll()
                            .requestMatchers(HttpMethod.POST, "/usuario").permitAll();

                   // req.anyRequest().authenticated();
                })
               // .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)//ejecuta primero el filtro que creamos y luego el de spring
                .build();//al decirle que es stateless no nos reenvia al apagina de inicio de sesion de defecto de spring security
    }
}
