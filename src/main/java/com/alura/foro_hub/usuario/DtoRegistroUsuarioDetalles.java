package com.alura.foro_hub.usuario;

import com.alura.foro_hub.perfil.Perfil;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record DtoRegistroUsuarioDetalles(
         String nombre,
         String email,
         List<Perfil> perfiles
) {
    public DtoRegistroUsuarioDetalles(Usuario usuario) {
        this(
                usuario.getNombre(),
                usuario.getEmail(),
                usuario.getPerfiles()
        );
    }
}
