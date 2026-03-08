package com.alura.foro_hub.infra.security;

import com.alura.foro_hub.usuario.Usuario;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {
    final String ISSUER = "Foro Hub";

    @Value("${api.security.token.secret}")//configurado en aplication properties
    private String secret;

    public String generarToken(Usuario usuario){
        //codigo proporcionado en la documentación de JWT de Auth0
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);//algoritmo de generacion de tokens ecibe un único parámetro, que es una contraseña específica de nuestro servidor para firmar el token
            return JWT.create()
                    .withIssuer(ISSUER)//que servidor firma el token
                    .withSubject(usuario.getEmail())//persona que se autentico
                    .withExpiresAt(fechaExpiracion())
                    .sign(algorithm);
        } catch (JWTCreationException exception){
            throw new RuntimeException("error ak generar el token JWT",exception);
        }
    }

    // No importa dónde esté el servidor, siempre usa el horario de Sudamérica (GTM-3)
    private Instant fechaExpiracion() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));//desde ahora hasta dentro de 2 horas tambien devuelve el instantaneo de la zona horaria
    }

    //validacion de token segun documentacion, que sea autentico y que no haya expirado
    public String getSubject(String tokenJWT){
        //verificar tokenJWT para recien obtener el usuario(mail)
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    // specify any specific claim validations
                    .withIssuer(ISSUER)//que servidor creo el token
                    // reusable verifier instance
                    .build()
                    .verify(tokenJWT)
                    .getSubject();


        } catch (JWTVerificationException exception){
            throw new TokenExpiredException("Token JWT invalido o expirado",Instant.now());
        }
    }
}
