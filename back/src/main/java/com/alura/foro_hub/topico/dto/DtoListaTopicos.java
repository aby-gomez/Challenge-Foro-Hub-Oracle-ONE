package com.alura.foro_hub.topico.dto;

import com.alura.foro_hub.topico.StatusTopico;
import com.alura.foro_hub.topico.Topico;

import java.time.Instant;

public record DtoListaTopicos(
        String titulo,
        String mensaje,
        Instant fechaCreacion,
        StatusTopico status,
        String autor,
        String nombreCurso
) {
    public DtoListaTopicos(Topico topico){
        this( topico.getTitulo(),
                topico.getMensaje(),
                topico.getFechaCreacion(),
                topico.getStatus(),
                topico.getAutor().getNombre(),
                topico.getCurso().getNombre());
    }
}
