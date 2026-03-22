package com.alura.foro_hub.topico;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface TopicoRepository extends JpaRepository<Topico,Long>, JpaSpecificationExecutor<Topico> {
            boolean existsByTituloAndMensaje(String titulo, String mensaje);

         Optional<Topico> findByIdAndAutorEmail(Long id, String email);

    Page<Topico> findAllByActivoTrue(Specification<Topico> filtroInicial, Pageable paginacion);
    Page<Topico> findAllByActivoTrue( Pageable paginacion);

    boolean existsByTituloAndMensajeAndActivoTrue(String titulo, String mensaje);
}
