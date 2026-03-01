package com.alura.foro_hub.usuario;

import com.alura.foro_hub.perfil.Perfil;
import com.alura.foro_hub.perfil.PerfilRepository;
import com.alura.foro_hub.perfil.Rol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository userRepository;

    @Autowired
    PerfilRepository perfilRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public Usuario registrarUsuario(DtoRegistroUsuario datos){

        Optional<Perfil> perfil = perfilRepository.findByNombre(Rol.ESTUDIANTE);//agrego manualmente el rol para pruebas

        if(perfil.isPresent()){
            Perfil perfilOk = perfil.get();
            Usuario user = new Usuario(datos,passwordEncoder);
            user.setPerfiles(perfilOk);
            return userRepository.save(user);
        }
        return null;
    }

}
