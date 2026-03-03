package com.alura.foro_hub.usuario;

import com.alura.foro_hub.infra.security.DatosTokenJWT;
import com.alura.foro_hub.infra.security.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping ("/login")
public class AuthController {
    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @PostMapping
    public ResponseEntity iniciarSesion(@RequestBody @Valid DtoLoginUsuario datos){
        //Este DTO se transforma en un DTO propio de Spring Security llamado
        //UsernamePasswordAuthenticationToken , específico de Spring
        //Security. Esto permite que un AuthenticationManager pueda
        //reconocerlo.
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(datos.email(), datos.contraseña()); //solicita Usuario y contrsaeña
        Authentication usuarioAutenticado = manager.authenticate(authenticationToken);//authenticate pide un token en formato especifico especifico, del tipo usernamepasswordetc

        String tokenJWT = tokenService.generarToken((Usuario) usuarioAutenticado.getPrincipal());
        return ResponseEntity.ok(new DatosTokenJWT(tokenJWT));

    }

}
