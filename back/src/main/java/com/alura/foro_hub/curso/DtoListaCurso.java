package com.alura.foro_hub.curso;

import jakarta.validation.constraints.NotNull;

public record DtoListaCurso(
        String nombreCurso,
        Categoria categoria
) {
    public DtoListaCurso(Curso curso) {
        this(
                curso.getNombre(),
                curso.getCategoria()
        );
    }
}
