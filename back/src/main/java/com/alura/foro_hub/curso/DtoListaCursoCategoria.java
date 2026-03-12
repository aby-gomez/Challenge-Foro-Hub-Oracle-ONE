package com.alura.foro_hub.curso;

public record DtoListaCursoCategoria(
        String nombreCurso,
        Categoria categoria
) {
    public DtoListaCursoCategoria(Curso curso) {
        this(
                curso.getNombre(),
                curso.getCategoria()
        );
    }
}
