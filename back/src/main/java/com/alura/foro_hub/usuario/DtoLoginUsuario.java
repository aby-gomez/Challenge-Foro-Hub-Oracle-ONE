package com.alura.foro_hub.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record DtoLoginUsuario(
        @NotBlank @Email String email,
        @NotBlank String contraseña
) {
}
