package com.alura.foro_hub.topico;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface TopicoRepository extends JpaRepository<Topico,Long>, JpaSpecificationExecutor<Topico> {
            boolean existsByTituloAndMensaje(String titulo, String mensaje);
}
