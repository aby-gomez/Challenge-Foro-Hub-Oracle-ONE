package com.alura.foro_hub.topico.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DtoActualizarTopico(
        @NotBlank String titulo,
        @NotBlank String mensaje
) {
}
