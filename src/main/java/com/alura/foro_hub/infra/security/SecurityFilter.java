package com.alura.foro_hub.infra.security;

import com.alura.foro_hub.usuario.UsuarioRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String tokenJWT = recuperarToken(request);
        if(tokenJWT != null) {
            //llamado a validacion del token
            String subject = tokenService.getSubject(tokenJWT);
            //aunque el token sea válido, el usuario pudo haber sido borrado de la base de datos, y el filtro debe verificar que sigue activo.
            UserDetails usuario = usuarioRepository.findByEmail(subject);
            //crea el objeto de autenticacion, no se envia la contraseña porque ya se valido el token y dice cuales son sus permisos
            Authentication authentication = new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request,response);//permite avanzar hacia el resto de peticiones
    }

    //extraemos token de la request
    private String recuperarToken(HttpServletRequest request) {
        String authorizationHeader =  request.getHeader("Authorization");
        if(authorizationHeader != null){
            return authorizationHeader.replace("Bearer ","");
        }
        return null;
    }
}
