package com.alura.foro_hub.curso;

public record DtoListaCurso(
        String cursoNombre
) {
    public DtoListaCurso(Curso curso){
        this(
                curso.getNombre()
        );
    }
}
