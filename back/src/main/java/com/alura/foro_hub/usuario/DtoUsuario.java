package com.alura.foro_hub.usuario;

public record DtoUsuario(
        Long id,
        String name
) {
    public DtoUsuario(Usuario usuario){
        this(
                usuario.getId(),
                usuario.getNombre()
        );
    }
}
