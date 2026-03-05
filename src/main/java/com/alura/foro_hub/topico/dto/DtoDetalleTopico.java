package com.alura.foro_hub.topico.dto;

import com.alura.foro_hub.curso.DtoCurso;
import com.alura.foro_hub.respuesta.DtoListaRespuestas;

import com.alura.foro_hub.topico.StatusTopico;
import com.alura.foro_hub.topico.Topico;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

public record DtoDetalleTopico(
        String titulo,
        String mensaje,
        Instant fechaCreacion,
        StatusTopico status,
        String autor,
        DtoCurso curso,
        List<DtoListaRespuestas> respuestas
) {
    public DtoDetalleTopico(Topico topico){
        this( topico.getTitulo(),
                topico.getMensaje(),
                topico.getFechaCreacion(),
                topico.getStatus(),
                topico.getAutor().getNombre(),
                //evito entrar al constructor si en el json el campo viene null
                topico.getCurso() != null ? new DtoCurso(topico.getCurso()) : null,
                // Si no hay respuestas, el stream genera una lista vacía [] automáticamente, no conviene null sino el front tmb deberia manejarlo
                topico.getRespuestas().stream()
                        .map(DtoListaRespuestas::new)
                        .toList()//como el dto solo transporta datos, la lista no deberia ser modificable desde aqui
        );
    }
}
