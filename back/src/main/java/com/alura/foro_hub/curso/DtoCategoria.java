package com.alura.foro_hub.curso;

import jakarta.validation.constraints.NotBlank;

public record DtoCategoria(
        @NotBlank String categoria
) {
}
