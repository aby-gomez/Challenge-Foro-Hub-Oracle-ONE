package com.alura.foro_hub.curso;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DtoCurso(
        @NotBlank String nombreCurso,
        @NotNull Categoria categoria
) {
    public DtoCurso(Curso curso){
        this(
                curso.getNombre(),
                curso.getCategoria()
        );
    }
}
