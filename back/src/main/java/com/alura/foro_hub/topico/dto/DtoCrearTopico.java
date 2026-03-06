package com.alura.foro_hub.topico.dto;

import com.alura.foro_hub.curso.DtoCurso;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DtoCrearTopico(
        @NotBlank String titulo,
        @NotBlank String mensaje,
        @NotNull @Valid DtoCurso curso
) {
}
