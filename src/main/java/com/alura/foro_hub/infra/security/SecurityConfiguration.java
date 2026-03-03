package com.alura.foro_hub.infra.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
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


    @Bean//anotación permite que Spring reconozca que esta clase debe ser cargada y esté disponible para que Spring Security la use.
    //para encriptar la contraseña
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Este es el estándar de la industria
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Autowired
    SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        return http.csrf(csrf -> csrf.disable())//desabilitamos  ataques que utiliza cookies dle navegador , al  ya tener un sistema stateless estamos protegiso contra esos ataques
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(req -> {
                    req.requestMatchers(HttpMethod.POST, "/login").permitAll()
                            .requestMatchers(HttpMethod.POST, "/usuario").permitAll();

                  req.anyRequest().authenticated();//cualquier otra request debe estar autenticada
                })
               .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)//ejecuta antes el filtro que cree, luego el usernamepassword...
                .build();//al decirle que es stateless no nos reenvia al apagina de inicio de sesion de defecto de spring security
    }
}
