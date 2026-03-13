package com.alura.foro_hub.curso;

import jakarta.validation.constraints.NotBlank;

public record DtoCategoria(
        @NotBlank String categoria
) {
    public DtoCategoria(Categoria categoria){
        this(
                categoria.name()
        );
    }
}
