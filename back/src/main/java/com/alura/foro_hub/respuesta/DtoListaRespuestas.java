package com.alura.foro_hub.respuesta;

import com.alura.foro_hub.topico.dto.DtoDetalleTopico;

import java.time.Instant;

public record DtoListaRespuestas(
        String mensaje,
        String autor,
        Instant fechaCreacion,
        boolean solucion
) {
    public DtoListaRespuestas(Respuesta respuesta){
        this(
            respuesta.getMensaje(),
            respuesta.getAutor().getNombre(),
            respuesta.getFechaCreacion(),
                respuesta.isSolucion()
        );
    }
}
