package com.alura.foro_hub.respuesta;

import com.alura.foro_hub.topico.dto.DtoDetalleTopico;
import com.alura.foro_hub.usuario.DtoUsuario;

import java.time.Instant;

public record DtoListaRespuestas(
        String mensaje,
        DtoUsuario autor,
        Instant fechaCreacion,
        boolean solucion
) {
    public DtoListaRespuestas(Respuesta respuesta){
        this(
            respuesta.getMensaje(),
                respuesta.getAutor() != null ?new DtoUsuario(respuesta.getAutor()) : null,
            respuesta.getFechaCreacion(),
                respuesta.isSolucion()
        );
    }
}
