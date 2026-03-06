package com.alura.foro_hub.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record DtoRegistroUsuario(
        @NotBlank @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$", message = "El nombre solo puede contener letras y espacios") String nombre,
        @NotBlank @Email String email,
        @NotBlank String contraseña
) {
}
