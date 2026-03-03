package com.alura.foro_hub.topico;

import com.alura.foro_hub.curso.Categoria;

import java.time.Instant;

public record DtoTopicoCreado(
        Long id,
        String titulo,
        String mensaje,
        Instant fechaCreacion,
        StatusTopico status,
        String autor,        // Solo el nombre o login del usuario
        String nombreCurso,  // Solo el nombre del curso
        Categoria categoria
) {
    public DtoTopicoCreado(Topico topico) {
        this(
                topico.getId(),
                topico.getTitulo(),
                topico.getMensaje(),
                topico.getFechaCreacion(),
                topico.getStatus(),
                topico.getAutor().getNombre(),           // Evitamos enviar el objeto Usuario completo
                topico.getCurso().getNombre(),         // Evitamos enviar el objeto Curso completo
                topico.getCurso().getCategoria()
        );
    }
}